import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { imageToBase64 } from "../utils/imageToBas";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if(firstName ==""){
        toast.error("First Name is required ")
        return
      }
      if(lastName ==""){
        toast.error("Last Name is required ")
        return
      }
      if(photoUrl ==""){
        toast.error(" Profile pic is required ")
        return
      }
      if(emailId ==""){
        toast.error("Email is required ")
        return
      }
      if(password.length<8){
        toast.error("Password's length is less then 8   ")
        return
      }
      
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password,photoUrl },
        { withCredentials: true }
      );
      if (res.status === 200) {

        // dispatch(addUser(res.data.data));
        toast.success(res.data.message)
        // console.log(res.data.message)
        setIsLogin(true)
      }
    } catch (err) {
      // setError(err?.response?.data?.message || "⚠️ Something went wrong!");
      console.log(err)
      toast.error(err.message)
      
    }
  };

  const handleLogin = async () => {
    try {
      if(emailId ==""){
        toast.error("Email is required ")
        return
      }
      if(password ==""){
        toast.error("Password is required ")
        return
      }
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true } //allow you to send the cookie back for further request
      );
      // console.log(res)
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        navigate("/");
        toast.success(res.data.message)
        // console.log(res.data.message)
      }
    } catch (err) {
      // setError(err?.response?.data?.message || "⚠️ Something went wrong!");
      toast.error(err.response.data)
      
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    // console.log(imagePic);
    setPhotoURL(imagePic)
  };

  return (
    <div className="flex my-10 justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          {error && (
            <p className="flex justify-center font-bold text-red-600 my-4">
              {error}
            </p>
          )}
          <h2 className="card-title justify-center text-2xl font-bold">
            {isLogin ? "Login" : "SignUp"}
          </h2>

          {!isLogin && (
            <>
              {" "}
              
              <label className="my-1 font-bold text-lg">FirstName:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="my-1 font-bold text-lg">LastName:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="my-1 font-bold text-lg">PhotoURL:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="file"
                  className="grow cursor-pointer"
                  // value={photoURL}
                  onChange={handleUploadPic}
                />
              </label>
            </>
          )}

          <label className="my-1 font-bold text-lg">Email ID:</label>
          <label className="input input-bordered flex items-center gap-2">
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
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="my-1 font-bold text-lg">Password:</label>
          <label className="input input-bordered flex items-center gap-2">
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
          {isLogin && (
            <p
              className="flex justify-end mb-2 underline cursor-pointer "
              onClick={() => navigate("/forgotpassword")}
            >
              Forget password?click here
            </p>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className=" justify-center underline cursor-pointer mx-auto"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New user? SignUp" : "Already registered ? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;