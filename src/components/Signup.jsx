import axios from "axios";
import { useFormik } from "formik";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { signUpValidation } from "../utils/yupValidation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordSVG from "../assets/icons/Password";
import EyeOpen from "../assets/icons/EyeOpen";
import EyeClose from "../assets/icons/EyeClose";
import EmailSVG from "../assets/icons/Email";
import imageCompression from "browser-image-compression";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    photoUrl: null,
  };

  const handleSignUp = async (values) => {
    try {
      const compressedFile = await imageCompression(values.photoUrl, {
        maxSizeMB: 10,
        maxWidthOrHeight: 1024,
      });
      console.log(compressedFile);
      if (compressedFile.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Max size is 10MB.");
        return;
      }
      const formData = new FormData();
      formData.append("firstName", values?.firstName);
      formData.append("lastName", values?.lastName);
      formData.append("emailId", values?.emailId);
      formData.append("password", values?.password);
      formData.append("photoUrl", compressedFile);

      const res = await axios.post(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: (values) => handleSignUp(values),
  });

  return (
    <div className="flex my-10 justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            SignUp
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <label className="my-1 font-bold text-lg">FirstName:</label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                name="firstName"
                type="text"
                className="grow"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                // onBlur={formik.handleBlur}
              />
            </label>
            {formik.errors.firstName && formik.touched.firstName && (
              <p className="text-red-500">{formik.errors.firstName} </p>
            )}

            <label className="my-1 font-bold text-lg">LastName:</label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                name="lastName"
                type="text"
                className="grow"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                // onBlur={formik.handleBlur}
              />
            </label>
            {formik.errors.lastName && formik.touched.lastName && (
              <p className="text-red-500">{formik.errors.lastName} </p>
            )}

            <label className="my-1 font-bold text-lg">Profile image</label>
            <label className="input input-bordered flex items-center gap-2 overflow-hidden">
              <input
                name="photoUrl"
                type="file"
                className="grow cursor-pointer"
                onChange={(e) => {
                  formik.setFieldValue("photoUrl", e.currentTarget.files[0]);
                }}
                accept="image/*"
              />
            </label>
            {formik.errors.photoUrl && formik.touched.photoUrl && (
              <p className="text-red-500">{formik.errors.photoUrl} </p>
            )}

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
              <p className="text-red-500">{formik.errors.emailId} </p>
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
              <p className="text-red-500">{formik.errors.password} </p>
            )}

            <div className="card-actions justify-center mt-4">
              <button
                disabled={formik.isSubmitting}
                className="btn btn-primary "
                type="submit"
              >
                {formik.isSubmitting ? (
                  <span className="loading loading-spinner text-info"></span>
                ) : (
                  "SignUp"
                )}
              </button>
            </div>
            <Link to={"/login"}>
              <p className=" justify-center underline cursor-pointer mx-auto">
                Already registered ? Login
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
