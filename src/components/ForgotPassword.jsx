import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/url";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forgotpassword`,
        { email },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setEmail("");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "⚠️ Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-20 mx-auto max-w-xl">
        <h1 className="text-blue-800 font-extrabold text-xl text-center mb-10">
          Forgot Password
        </h1>
        <label className="mb-4 font-bold text-lg">
          Please provide your Email ID:
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {error && <p className=" text-red-600 mt-2">{error}</p>}
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={() => sendEmail()}>
            Submit
          </button>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>
              Mail to reset password has been sent to respective Email address.
              kindly check your Email!{" "}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;