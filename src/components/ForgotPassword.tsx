import React, { useState } from "react";
import Navbar from "./Navbar";
import { useForgotPasswordMutation } from "../store/tinderApi";
import { Mail, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ForgotPassword(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const sendEmail = async (): Promise<void> => {
    try {
      setError("");
      await forgotPassword({ email }).unwrap();
      setEmail("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 4000);
    } catch (err) {
      const errorPayload = err as any;
      setError(errorPayload?.data?.message || "⚠️ Something went wrong!");
    }
  };

  return (
    <div className="bg-[#0B1120] text-slate-100 min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Navbar Integration */}
      <Navbar />

      {/* Background aurora mesh orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] rounded-full bg-indigo-600 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-violet-600 blur-[140px]"></div>
      </div>

      {/* Core card layout */}
      <div className="flex-grow flex items-center justify-center px-4 relative z-10 py-12">
        <div className="w-full max-w-md bg-[#161B22]/60 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-md text-left">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
              <Sparkles size={12} className="text-pink-400" />
              <span>Password Recovery Help</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Forgot Password</h2>
            <p className="text-slate-400 text-sm mt-2">
              Provide your developer email, and we'll send a password reset token link immediately.
            </p>
          </div>

          {/* Form input */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-300">Registered Email Address</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  className="w-full bg-[#0F172A]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                  placeholder="linus@git.org"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-col gap-4">
              <button 
                disabled={isLoading}
                className="w-full btn btn-primary bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 border-none py-3 rounded-xl text-sm font-bold text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 group transition-all" 
                onClick={() => sendEmail()}
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-white"></span>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <button
                type="button"
                className="text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1 hover:underline"
                onClick={() => navigate("/login")}
              >
                Back to Login Screen
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Success Notification Alert */}
      {showToast && (
        <div className="toast toast-top toast-center z-50 p-4">
          <div className="alert alert-success bg-gradient-to-r from-green-600 to-emerald-600 border-none text-white font-bold text-sm shadow-xl flex items-center gap-2.5 rounded-xl">
            <Sparkles size={16} />
            <span>A reset password email has been sent. Check your inbox!</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default ForgotPassword;
