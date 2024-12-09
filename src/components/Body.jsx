import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";

function Body() {
  //fetching the user whenever thw component mounts if there is no user ,redirect them to login page
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) return;
        // Only fetch if it's not the forget password route
        if (location.pathname === "/forgetpassword") return;
        const res = await axios.get(
          `${BASE_URL}/profile/view`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data)

        if (res.status === 200) {
          dispatch(addUser(res.data.data));
        }
      } catch {
        // Redirect to login only if it's not the forget password route
        if (location.pathname !== "/forgetpassword") {
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [dispatch, navigate, user]);

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;