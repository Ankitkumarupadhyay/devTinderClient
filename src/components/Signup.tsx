import React, { useState } from "react";
import { useSignupMutation } from "../store/tinderApi";
import { toast } from "react-toastify";
import { useFormik as useFormikHook } from "formik";
import { signUpValidation } from "../utils/yupValidation";
import { Link, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import userProfile from "../assets/images/userProfile.png";
import { Mail, Lock, User as UserIcon, Upload, ArrowRight, Sparkles, Heart, Eye, EyeOff } from "lucide-react";

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
  const [signup] = useSignupMutation();

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

      const res = await signup(formData).unwrap() as SignUpResponse;

      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      const error = err as any;
      console.log(error);
      toast.error(error?.data || error?.message || "Signup failed");
    }
  };

  const formik = useFormikHook<SignUpValues>({
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
    <div className="min-h-[90vh] bg-[#0B1120] text-slate-100 flex items-center justify-center relative px-4 overflow-hidden py-12">

      {/* Background aurora mesh orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-pink-600 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600 blur-[140px]"></div>
      </div>

      {/* Combined Single Glass Container with gorgeous border radius */}
      <div className="relative w-full max-w-4xl bg-[#161B22]/60 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 items-stretch z-10 overflow-hidden">

         {/* Left Form Pane */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between text-left border-b lg:border-b-0 lg:border-r border-white/10">

          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 mb-3">
                <Sparkles size={12} className="text-violet-400" />
                <span>Join 10k+ developers on devTinder</span>
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Create Your Account</h2>
              <p className="text-slate-400 text-sm mt-1">Begin matching and building projects today.</p>
            </div>

            {/* Registration fields */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

              {/* Names splitrow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300">First Name</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400"><UserIcon size={16} /></span>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="Ankit"
                      className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      onChange={formik.handleChange}
                      value={formik.values.firstName || ""}
                    />
                  </div>
                  {formik.errors.firstName && formik.touched.firstName && (
                    <p className="text-red-400 text-xs mt-0.5">{formik.errors.firstName}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300">Last Name</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400"><UserIcon size={16} /></span>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Upadhyay"
                      className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      onChange={formik.handleChange}
                      value={formik.values.lastName || ""}
                    />
                  </div>
                  {formik.errors.lastName && formik.touched.lastName && (
                    <p className="text-red-400 text-xs mt-0.5">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Avatar upload */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">Profile Picture</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400"><Upload size={16} /></span>
                  <input
                    name="photoUrl"
                    type="file"
                    className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-400 file:mr-4 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-violet-500/10 file:text-violet-300 hover:file:bg-violet-500/20 cursor-pointer outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                </div>
                {formik.errors.photoUrl && formik.touched.photoUrl && (
                  <p className="text-red-400 text-xs mt-0.5">{formik.errors.photoUrl as string}</p>
                )}
              </div>

              {/* Email ID */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400"><Mail size={16} /></span>
                  <input
                    name="emailId"
                    type="email"
                    placeholder="ankitupadhyay0811@gmail.com"
                    className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    onChange={formik.handleChange}
                    value={formik.values.emailId || ""}
                  />
                </div>
                {formik.errors.emailId && formik.touched.emailId && (
                  <p className="text-red-400 text-xs mt-0.5">{formik.errors.emailId}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400"><Lock size={16} /></span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-2.5 pl-9 pr-9 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    onChange={formik.handleChange}
                    value={formik.values.password || ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-slate-400 hover:text-white focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-400 text-xs mt-0.5">{formik.errors.password}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="mt-4">
                <button
                  className="w-full btn btn-primary bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 border-none py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group transition-all"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <>
                      Register Account
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Back to Login */}
              <p className="text-xs text-slate-400 text-center mt-3">
                Already registered?{" "}
                <Link to="/login" className="text-indigo-400 font-bold hover:underline hover:text-indigo-300">
                  Login instead
                </Link>
              </p>

              {/* Separator */}
              <div className="flex items-center gap-3 w-full my-3 before:content-[''] before:flex-1 before:h-[1px] before:bg-white/5 after:content-[''] after:flex-1 after:h-[1px] after:bg-white/5">
                <span className="text-[10px] tracking-widest font-black text-slate-500 uppercase">OR</span>
              </div>

              {/* Social Login Button */}
              <button 
                type="button" 
                className="py-2.5 px-4 rounded-xl bg-[#1E2538] hover:bg-[#252E46] border border-white/5 text-white font-semibold text-xs tracking-wide transition-all w-full flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

            </form>
          </div>

        </div>

        {/* Right Live Preview Pane with rich, fully populated elements */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-[#161B22]/20 flex flex-col justify-between items-center relative overflow-hidden">

          {/* Inner ambient glowing orbs inside live card panel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/10 blur-[80px] pointer-events-none"></div>

          {/* Label banner */}
          <div className="w-full text-center border-b border-white/5 pb-4 mb-6 relative z-10">
            <span className="text-[10px] uppercase font-black tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-full">
              Live Card Preview
            </span>
            <p className="text-[11px] text-slate-400 mt-2">See exactly how your profile looks on other feeds.</p>
          </div>

          {/* Swipe Card Mock rendering */}
          <div className="relative w-full max-w-[270px] aspect-[3/4.2] bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 rounded-2xl p-4 shadow-2xl relative z-10 flex flex-col justify-between text-left">

            {/* Top section image container */}
            <div className="w-full aspect-square rounded-xl overflow-hidden relative border border-white/5 bg-slate-950">
              <img
                src={imageUrl ? imageUrl : userProfile}
                alt="Profile Preview"
                className="w-full h-full object-cover transition-all"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-[9px] font-bold text-green-400 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-400 animate-ping"></span>
                <span>Active</span>
              </div>
            </div>

            {/* Middle text components */}
            <div className="mt-3.5 text-left">
              <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                {formik.values.firstName || "Ankit"}{" "}
                {formik.values.lastName || "Upadhyay"}
                <span className="text-slate-400 font-semibold text-xs">, 25</span>
              </h3>
              <p className="text-[10px] text-indigo-400 font-medium tracking-wide truncate mt-0.5">
                {formik.values.emailId || "ankitupadhyay0811@gmail.com"}
              </p>
            </div>

            {/* Bottom status layout */}
            <div className="mt-2.5 border-t border-white/5 pt-2 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1 text-slate-400">
                <Heart size={10} className="text-pink-400 fill-pink-400" />
                <span>Looking for matches</span>
              </div>
              <span className="text-[9px] uppercase font-bold text-indigo-400">devTinder Core</span>
            </div>

          </div>

          {/* Footnote card quotes box - beautifully balances and fills the vertical space of the right-side layout */}
          <div className="w-full mt-6 bg-[#0B0F1A]/80 border border-white/5 p-4 rounded-2xl relative z-10 text-center shadow-inner">
            <p className="text-[10px] text-slate-400 italic leading-relaxed">
              &ldquo;This is how your profile will appear to other top-tier developers in the feed. Fill out the registration form to start matching!&rdquo;
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Signup;
