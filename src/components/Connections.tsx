import React from "react";
import { useGetConnectionsQuery } from "../store/tinderApi";
import ConnectionCard from "./ConnectionCard";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { Sparkles, Compass, Users } from "lucide-react";

function Connections(): React.ReactElement {
  const { data, isLoading } = useGetConnectionsQuery();
  const connections = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative px-4 overflow-hidden">
        <Loader />
      </div>
    );
  }

  // Beautiful network empty state
  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] text-slate-100 flex flex-col items-center justify-center relative px-4 overflow-hidden py-12">
        
        {/* Background ambient aurora orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-violet-600 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600 blur-[140px]"></div>
        </div>

        {/* Custom Empty icon ring */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6 z-10 rounded-full border border-white/5 bg-[#0F1322]/80 shadow-inner">
          <Users size={32} className="text-slate-500 animate-pulse" />
        </div>

        {/* Text descriptions */}
        <div className="max-w-md text-center z-10 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
            <Sparkles size={12} className="text-pink-400" />
            <span>Network Empty</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Build Your Elite Network</h1>
          <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
            You don't have any professional connections in your network yet. Jump over to the Discover feed to swiper-match and build your circle!
          </p>
        </div>

        {/* CTA link to Discover feed */}
        <Link
          to="/feed"
          className="flex items-center justify-center gap-2 px-5 py-3 mt-8 z-10 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 text-xs font-black tracking-wider text-white hover:opacity-95 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <Compass size={14} />
          <span>START SWIPING</span>
        </Link>

      </div>
    );
  }

  return (
    <div className="py-8 px-6 sm:px-8 max-w-5xl mx-auto flex flex-col gap-6 relative">
      
      {/* Background ambient aurora orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600 blur-[140px]"></div>
      </div>

      {/* Header section details */}
      <div className="z-10 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-300 uppercase tracking-wider mb-2">
          <Users size={11} className="text-indigo-400" />
          <span>Active Connections</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">My Professional Circle</h2>
        <p className="text-slate-400 text-xs mt-1">Chat directly with collaborators, partners, and recruiters in your network.</p>
      </div>

      {/* Grid container listing connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 mt-2">
        {connections.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </div>

    </div>
  );
}

export default Connections;
