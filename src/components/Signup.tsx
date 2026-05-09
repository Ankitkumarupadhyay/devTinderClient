import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { signUpValidation } from "../utils/yupValidation";
import { Link, useNavigate } from "react-router-dom";
import PasswordSVG from "../assets/icons/Password";
import EyeOpen from "../assets/icons/EyeOpen";
import EyeClose from "../assets/icons/EyeClose";
import EmailSVG from "../assets/icons/Email";
import imageCompression from "browser-image-compression";
import userProfile from "../assets/images/userProfile.png";

interface SignUpValues {
  firstName?: string;
  lastName?: string;
  emailId?: string;
  password?: string;
  photoUrl?: File | null;
}

interface SignUpResponse {
  message: string;
}

const Signup = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  const initialValues: SignUpValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    photoUrl: null,
  };

  const handleSignUp = async (values: SignUpValues): Promise<void> => {
    try {
      if (!values.photoUrl) {
        toast.error("Profile picture is required.");
        return;
      }
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
      formData.append("firstName", values.firstName || "");
      formData.append("lastName", values.lastName || "");
      formData.append("emailId", values.emailId || "");
      formData.append("password", values.password || "");
      formData.append("photoUrl", compressedFile);

      const res = await axios.post<SignUpResponse>(`${BASE_URL}/signup`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      const axiosError = err as AxiosError<string>;
      console.log(axiosError);
      toast.error(axiosError?.response?.data || "Signup failed");
    }
  };

  const formik = useFormik<SignUpValues>({
    initialValues: initialValues,
    validationSchema: signUpValidation,
    onSubmit: (values) => handleSignUp(values),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files?.[0] || null;
    formik.setFieldValue("photoUrl", file);
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImageUrl(localUrl);
    } else {
      setImageUrl("");
    }
  };

  return (
    <div className="flex my-10 justify-center gap-2 flex-wrap">
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
                value={formik.values.firstName || ""}
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
                value={formik.values.lastName || ""}
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
                onChange={(e) => handleImageUpload(e)}
                accept="image/*"
              />
            </label>
            {formik.errors.photoUrl && formik.touched.photoUrl && (
              <p className="text-red-500">{formik.errors.photoUrl as string} </p>
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
                value={formik.values.emailId || ""}
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
                value={formik.values.password || ""}
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
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <div className="w-full h-[50%] flex justify-center items-center">
            <img
              src={imageUrl ? imageUrl : userProfile}
              alt="user"
              className="object-contain rounded-md "
            />
          </div>
          <div className="p-3 flex justify-center items-center">
            <button className="p-2 m-2 w-[80%] rounded-md bg-white text-black font-bold">
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
