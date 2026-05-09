import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginValidation } from "../utils/yupValidation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { User } from "../types";

interface LoginValues {
  emailId?: string;
  password?: string;
}

interface LoginResponse {
  message: string;
  data: User;
}

function Login(): React.ReactElement {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: LoginValues = {
    emailId: "",
    password: "",
  };

  const handleLogin = async (values: LoginValues): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("emailId", values.emailId || "");
      formData.append("password", values.password || "");

      const res = await axios.post<LoginResponse>(
        `${BASE_URL}/login`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        localStorage.setItem("tinderUser", JSON.stringify(res.data.data));
        dispatch(addUser(res.data.data));
        navigate("/feed");
        toast.success(res.data.message);
      }
    } catch (err) {
      const axiosError = err as AxiosError<string>;
      console.log(axiosError);
      toast.error(axiosError?.response?.data || "Login failed");
    }
  };

  const formik = useFormik<LoginValues>({
    initialValues: initialValues,
    validationSchema: loginValidation,
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <div className="min-h-[85vh] bg-[#0B1120] text-slate-100 flex items-center justify-center relative px-4 overflow-hidden py-12">
      
      {/* Background aurora mesh orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-violet-600 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500 blur-[140px]"></div>
      </div>

      {/* Glassmorphic Card Container */}
      <div className="relative w-full max-w-md bg-[#161B22]/60 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-indigo-950/40 backdrop-blur-md z-10">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <Sparkles size={12} className="text-pink-400" />
            <span>Welcome back to devTinder</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Account Log In
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Enter your credentials to connect with other developers
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 text-left">
          
          {/* Email ID Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-300">Email Address</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <Mail size={18} />
              </span>
              <input
                name="emailId"
                type="email"
                placeholder="developer@example.com"
                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                onChange={formik.handleChange}
                value={formik.values.emailId || ""}
              />
            </div>
            {formik.errors.emailId && formik.touched.emailId && (
              <p className="text-red-400 text-xs mt-0.5">{formik.errors.emailId}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-300">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400">
                <Lock size={18} />
              </span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                onChange={formik.handleChange}
                value={formik.values.password || ""}
              />
              <button
                type="button"
                className="absolute right-3 text-slate-400 hover:text-white transition-colors focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-400 text-xs mt-0.5">{formik.errors.password}</p>
            )}
          </div>

          {/* Forget Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline focus:outline-none"
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot password? Click here
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              className="w-full btn btn-primary bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 border-none py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 group transition-all"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  Log In Account
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          {/* Navigate to Signup */}
          <p className="text-sm text-slate-400 text-center mt-4">
            New developer?{" "}
            <button
              type="button"
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
