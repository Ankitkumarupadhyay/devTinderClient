import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/appStore";
import { removeUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { User } from "../types";

function Navbar(): React.ReactElement {
  const storeUser = useAppSelector((store) => store.user);

  const getLocalStorageUser = (): User | null => {
    const raw = localStorage.getItem("tinderUser");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  };

  const [user, setuser] = useState<User | null>(getLocalStorageUser());

  useEffect(() => {
    setuser(getLocalStorageUser());
  }, [storeUser]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeUser());
        localStorage.removeItem("tinderUser");
        toast.success("Logout successfull");
        navigate("/login");
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Logout failed");
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
                <img src={user.photoUrl} alt="user profile" />
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
                <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
