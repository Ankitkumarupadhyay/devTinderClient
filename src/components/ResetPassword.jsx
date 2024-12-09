import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/url";

function ResetPassword() {
  const navigate = useNavigate();
  const { resetToken } = useParams(); // Extract resetToken from URL

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/resetpassword/${resetToken}`,
        { password, passwordConfirm },
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/");
        setPassword("");
        setPasswordConfirm("");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "⚠️ Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="my-20 mx-auto max-w-xl">
        <h1 className="text-blue-800 font-extrabold text-xl text-center mb-10">
          Reset Password
        </h1>
        <label className="my-1 font-bold text-lg">Password:</label>
        <label className="input input-bordered flex items-center gap-2 mb-6 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="my-1 font-bold text-lg">Password Confirm:</label>
        <label className="input input-bordered flex items-center gap-2 mb-5 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password Confirm"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </label>
        {error && <p className=" text-red-600 mt-3">{error}</p>}
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={() => resetPassword()}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;