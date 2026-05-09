import React from "react";
import { useDispatch } from "react-redux";
import UsersCard from "../components/UsersCard";
import Loader from "../components/Loader";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { User } from "../types";
import { Sparkles, Upload, ArrowRight, Check } from "lucide-react";

interface EditProfileValues {
  firstName?: string;
  lastName?: string;
  age?: string | number;
  gender?: "Male" | "Female" | "Other" | "";
  photoUrl?: string | File;
  about?: string;
}

interface EditProfileResponse {
  message: string;
  data: User;
}

function EditProfile(): React.ReactElement {
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

  const initialValues: EditProfileValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
  };

  const dispatch = useDispatch();

  const handleUpdate = async (values: EditProfileValues): Promise<void> => {
    try {
      let compressedFile: File | string | undefined;
      if (typeof values.photoUrl === "string") {
        compressedFile = values.photoUrl;
      } else if (values.photoUrl instanceof File) {
        compressedFile = await imageCompression(values.photoUrl, {
          maxSizeMB: 10,
          maxWidthOrHeight: 1024,
        });
        if (compressedFile.size > 10 * 1024 * 1024) {
          toast.error("File is too large. Max size is 10MB.");
          return;
        }
      }

      const formData = new FormData();

      const fieldsToCheck: Array<keyof EditProfileValues> = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
      ];
      for (const field of fieldsToCheck) {
        if (values[field] !== initialValues[field]) {
          const val = values[field];
          if (val !== undefined && val !== null) {
            formData.append(field, val.toString());
          }
        }
      }

      if (values.photoUrl !== initialValues.photoUrl && compressedFile) {
        formData.append("photoUrl", compressedFile);
      }

      if (Array.from(formData.keys()).length === 0) {
        toast.error("Update any field");
        return;
      }

      const res = await axios.patch<EditProfileResponse>(
        `${BASE_URL}/profile/edit`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        localStorage.setItem("tinderUser", JSON.stringify(res.data.data));
        toast.success(res.data.message);
      }
    } catch (err) {
      const error = err as Error;
      console.log(error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const formik = useFormik<EditProfileValues>({
    initialValues: initialValues,
    onSubmit: (values) => handleUpdate(values),
  });

  if (!user) return <Loader />;

  return (
    <div className="py-8 px-6 sm:px-8 max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative">
      
      {/* Background ambient aurora orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600 blur-[140px]"></div>
      </div>

      {/* Left Column: Premium Edit Form */}
      <div className="xl:col-span-6 bg-[#0F1322] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-left z-10 relative">
        
        {/* Form header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-300 uppercase tracking-wider mb-2">
            <Sparkles size={11} className="text-indigo-400" />
            <span>Profile Settings</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Edit Your Profile</h2>
          <p className="text-slate-400 text-xs mt-1">
            Keep your credentials up-to-date to stand out to elite developers and premium tech recruiters.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          
          {/* Names Split Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-slate-300">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="Ankit"
                className="w-full bg-[#090D1A] border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                onChange={formik.handleChange}
                value={formik.values.firstName || ""}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className="text-red-400 text-[11px] mt-0.5">{formik.errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-slate-300">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Upadhyay"
                className="w-full bg-[#090D1A] border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                onChange={formik.handleChange}
                value={formik.values.lastName || ""}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className="text-red-400 text-[11px] mt-0.5">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Profile image upload */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300">Profile Image</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-400"><Upload size={14} /></span>
              <input
                name="photoUrl"
                type="file"
                className="w-full bg-[#090D1A] border border-white/5 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-400 file:mr-4 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-extrabold file:bg-violet-500/10 file:text-violet-300 hover:file:bg-violet-500/20 cursor-pointer outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0] || null;
                  formik.setFieldValue("photoUrl", file);
                }}
                accept="image/*"
              />
            </div>
            {formik.errors.photoUrl && formik.touched.photoUrl && (
              <p className="text-red-400 text-[11px] mt-0.5">{formik.errors.photoUrl as string}</p>
            )}
          </div>

          {/* Age field */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300">Age</label>
            <input
              name="age"
              type="text"
              placeholder="25"
              className="w-full bg-[#090D1A] border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
              onChange={formik.handleChange}
              value={formik.values.age || ""}
            />
          </div>

          {/* Customized inline horizontal Gender button pills */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300">Select Gender</label>
            <div className="grid grid-cols-3 gap-3 mt-1">
              {(["Male", "Female", "Other"] as const).map((g) => {
                const isActive = formik.values.gender === g;
                return (
                  <button
                    type="button"
                    key={g}
                    onClick={() => formik.setFieldValue("gender", g)}
                    className={`py-2 px-3 rounded-xl text-xs font-black transition-all border text-center active:scale-95 duration-150 flex items-center justify-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-transparent text-white shadow-lg shadow-indigo-600/15"
                        : "bg-[#090D1A] border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && <Check size={12} className="stroke-[3]" />}
                    <span>{g.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* About Textarea Bio */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300">Bio / Description</label>
            <textarea
              name="about"
              onChange={formik.handleChange}
              value={formik.values.about || ""}
              rows={4}
              className="w-full bg-[#090D1A] border border-white/5 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
              placeholder="Tell other developers about your engineering interests, core projects, and goals..."
            />
          </div>

          {/* Action trigger button */}
          <div className="mt-4">
            <button
              disabled={formik.isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 border-none text-xs font-black tracking-wider text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              type="submit"
            >
              {formik.isSubmitting ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  <span>SAVE PROFILE DETAILS</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>

      {/* Right Column: Live Wide-Card Preview */}
      <div className="xl:col-span-6 flex flex-col items-center justify-center sticky top-8 z-10">
        
        {/* Dynamic Card Header Caption */}
        <div className="mb-4 text-center">
          <span className="text-[9px] uppercase font-black tracking-widest text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-full">
            LIVE CARD PREVIEW
          </span>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">This is how your matching card displays on other developers' dashboards.</p>
        </div>

        <UsersCard
          user={{
            _id: user._id,
            emailId: user.emailId,
            firstName: formik.values.firstName || "Ankit",
            lastName: formik.values.lastName || "Upadhyay",
            age: formik.values.age ? Number(formik.values.age) : undefined,
            gender: formik.values.gender || undefined,
            photoUrl: typeof formik.values.photoUrl === "string" ? formik.values.photoUrl : user.photoUrl,
            about: formik.values.about,
          }}
        />

      </div>

    </div>
  );
}

export default EditProfile;
