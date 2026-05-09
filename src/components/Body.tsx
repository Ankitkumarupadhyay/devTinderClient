import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";
import { User } from "../types";

interface ProfileResponse {
  data: User;
}

function Body(): React.ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getLocalStorageUser = (): User | null => {
    const raw = localStorage.getItem("tinderUser");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  };

  const user = getLocalStorageUser();

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        if (user) return;
        if (location.pathname === "/forgotpassword") return;
        if (location.pathname === "/login") return;
        if (location.pathname === "/signup") return;
        const res = await axios.get<ProfileResponse>(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          localStorage.setItem("tinderUser", JSON.stringify(res.data.data));
          dispatch(addUser(res.data.data));
        }
      } catch {
        if (location.pathname !== "/forgotpassword") {
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [dispatch, navigate, location.pathname]); // Removed user to avoid infinite triggers, kept pathname

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Body;
