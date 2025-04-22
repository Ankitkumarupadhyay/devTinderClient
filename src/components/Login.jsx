import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginValidation } from "../utils/yupValidation";
import EmailSVG from "../assets/icons/Email";
import PasswordSVG from "../assets/icons/Password";
import EyeOpen from "../assets/icons/EyeOpen";
import EyeClose from "../assets/icons/EyeClose";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    emailId: "",
    password: "",
  };

  const handleLogin = async (values) => {
    try {
      const formData = new FormData();
      formData.append("emailId", values?.emailId);
      formData.append("password", values?.password);
      const res = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        localStorage.setItem("tinderUser", JSON.stringify(res.data.data));
        dispatch(addUser(res.data.data));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <div className="flex my-10 justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            Login
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <label className="my-1 font-bold text-lg">Email ID:</label>
            <label className="input input-bordered flex items-center gap-2">
              <EmailSVG />
              <input
                name="emailId"
                type="email"
                className="grow"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.emailId}
                // onBlur={formik.handleBlur}
              />
            </label>
            {formik.errors.emailId && formik.touched.emailId && (
              <p className="text-red-500 mt-1">{formik.errors.emailId} </p>
            )}

            <label className="my-1 font-bold text-lg">Password:</label>
            <label className=" input input-bordered flex items-center gap-2">
              <PasswordSVG />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="grow"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOpen /> : <EyeClose />}
              </span>
            </label>

            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 mt-1">{formik.errors.password} </p>
            )}

            <p
              className="flex justify-end mb-2 underline cursor-pointer "
              onClick={() => navigate("/forgotpassword")}
            >
              Forget password?click here
            </p>

            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" type="submit">
                {formik.isSubmitting ? (
                  <span className="loading loading-spinner text-info"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p
              onClick={() => navigate("/signup")}
              className=" justify-center underline cursor-pointer mx-auto"
            >
              New user? SignUp
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
