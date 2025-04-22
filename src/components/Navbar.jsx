import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function Navbar() {
  const storeUser = useSelector((store) => store.user);
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("tinderUser"))
  );
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("tinderUser"));
    setuser(localUser);
  }, [storeUser]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      //if logged out successfully remove the user from store and redirect to login page
      if (response.status === 200) {
        dispatch(removeUser());
        localStorage.removeItem("tinderUser");
        toast.success("Logout successfull");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message || "Logout failed");
      navigate("/error");
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 devTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-1 ">
          <div className="form-control md:font-bold">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end md:mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user?.photoUrl} alt="user profile" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
