import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useAppSelector } from "../store/appStore";
import UserCard from "./UsersCard";
import { useNavigate, Link } from "react-router-dom";
import Loader from "./Loader";
import { BASE_URL } from "../utils/url";
import { User } from "../types";
import { Sparkles, Users, Search, ArrowRight, Settings } from "lucide-react";

const Feed = (): React.ReactElement => {
  const feed = useAppSelector((store) => store.feed);
  const storeUser = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getFeed = async (): Promise<void> => {
      try {
        const res = await axios.get<User[]>(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });

        dispatch(addFeed(res.data));
      } catch {
        //
      }
    };
    getFeed();
  }, [dispatch, navigate]);

  if (!feed) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative px-4 overflow-hidden">
        <Loader />
      </div>
    );
  }

  // Beautiful pulsing radar scanning empty state if no users found
  if (feed.length <= 0) {
    const userPhoto = storeUser?.photoUrl;
    
    return (
      <div className="min-h-[calc(100vh-4rem)] text-slate-100 flex flex-col items-center justify-center relative px-4 overflow-hidden py-12">
        
        {/* Background ambient aurora orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600 blur-[140px]"></div>
        </div>

        {/* Pulse radar animation structure */}
        <div className="relative flex items-center justify-center w-40 h-40 mb-8 z-10">
          {/* Outer ring */}
          <div className="absolute w-full h-full rounded-full border border-violet-500/20 animate-ping opacity-60 duration-[3000ms]"></div>
          {/* Middle ring */}
          <div className="absolute w-3/4 h-3/4 rounded-full border border-indigo-500/25 animate-ping opacity-45 [animation-delay:0.8s] duration-[3000ms]"></div>
          {/* Inner ring */}
          <div className="absolute w-1/2 h-1/2 rounded-full border border-pink-500/15 animate-ping opacity-30 [animation-delay:1.6s] duration-[3000ms]"></div>
          
          {/* Centered Glowing Core showing user's own avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative z-20 border border-white/15 overflow-hidden">
            {userPhoto ? (
              <img src={userPhoto} alt="My Profile" className="w-full h-full object-cover" />
            ) : (
              <Search className="text-white animate-pulse" size={24} />
            )}
          </div>
        </div>

        {/* Informative text captions */}
        <div className="max-w-md text-center z-10 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
            <Sparkles size={12} className="text-pink-400" />
            <span>Scanning DevTinder...</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">You've Cleared Your Feed!</h1>
          <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
            There are no new developers nearby right now. Try updating your skill sets or check back soon to match with newly registered engineers!
          </p>
        </div>

        {/* Interactive action options */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 z-10">
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1E2538] hover:bg-[#252E46] border border-white/5 text-xs font-black tracking-wider text-slate-200 hover:text-white transition-all shadow-lg shadow-black/10 active:scale-95"
          >
            <Settings size={14} />
            <span>EDIT PROFILE</span>
          </Link>
          <Link
            to="/connections"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 text-xs font-black tracking-wider text-white hover:opacity-95 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <span>VIEW CONNECTIONS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-full relative overflow-hidden">
      
      {/* Background ambient aurora orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600 blur-[140px]"></div>
      </div>

      {/* Centered Swiper Component */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* Helper title header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-300 uppercase tracking-wider mb-2">
            <Users size={11} className="text-indigo-400" />
            <span>Discover Top-Tier Talent</span>
          </div>
          <h2 className="text-xl font-bold text-slate-300 tracking-tight">Your Daily Matches</h2>
        </div>

        <UserCard user={feed[0]} />
        
      </div>

    </div>
  );
};

export default Feed;
