import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../store/appStore";
import { removeRequest, addRequests } from "../store/requestSlice";
import { BASE_URL } from "../utils/url";
import { ConnectionRequest } from "../types";
import { Sparkles, MapPin, Inbox, Compass, Check, X } from "lucide-react";

interface RequestsResponse {
  data: ConnectionRequest[];
}

function Requests(): React.ReactElement {
  const dispatch = useDispatch();
  const requests = useAppSelector((store) => store.requests);
  const navigate = useNavigate();

  const reviewRequest = async (status: "accepted" | "rejected", id: string): Promise<void> => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeRequest(id));
      }
    } catch {
      //   
    }
  };

  useEffect(() => {
    const fetchRequests = async (): Promise<void> => {
      try {
        const res = await axios.get<RequestsResponse>(
          `${BASE_URL}/user/requests`,
          {
            withCredentials: true,
          }
        );
        dispatch(addRequests(res.data.data));
      } catch {
        //
      }
    };
    fetchRequests();
  }, [dispatch, navigate]);

  if (!requests) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative px-4 overflow-hidden">
        <Loader />
      </div>
    );
  }

  // Beautiful requests empty state
  if (requests.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] text-slate-100 flex flex-col items-center justify-center relative px-4 overflow-hidden py-12">
        
        {/* Background ambient aurora orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#06B6D4] blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600 blur-[140px]"></div>
        </div>

        {/* Custom Empty inbox icon ring */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6 z-10 rounded-full border border-white/5 bg-[#0F1322]/80 shadow-inner">
          <Inbox size={32} className="text-slate-500 animate-pulse" />
        </div>

        {/* Text details */}
        <div className="max-w-md text-center z-10 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
            <Sparkles size={12} className="text-pink-400" />
            <span>Inbox Cleared</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Your Inbox is Clear!</h1>
          <p className="text-slate-400 text-xs leading-relaxed mt-2.5">
            You have handled all pending incoming developer invitations. Keep matching on Discover to find premium talent!
          </p>
        </div>

        {/* CTA link to Discover feed */}
        <Link
          to="/feed"
          className="flex items-center justify-center gap-2 px-5 py-3 mt-8 z-10 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 text-xs font-black tracking-wider text-white hover:opacity-95 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <Compass size={14} />
          <span>FIND NEW DEVELOPERS</span>
        </Link>

      </div>
    );
  }

  // Dynamically assign cool professional roles based on name value
  const getMockRole = (name: string): string => {
    const roles = [
      "Senior Frontend Engineer",
      "Backend Systems Architect",
      "Fullstack Web Developer",
      "DevOps & Cloud Engineer",
      "ML Infrastructure Engineer",
      "Security Operations Lead"
    ];
    const charCodeSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return roles[charCodeSum % roles.length];
  };

  // Dynamically assign locations based on name value
  const getMockLocation = (name: string): string => {
    const locations = ["San Francisco, CA", "Seattle, WA", "New York, NY", "Austin, TX", "London, UK", "Bengaluru, IN"];
    const charCodeSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return locations[charCodeSum % locations.length];
  };

  return (
    <div className="py-8 px-6 sm:px-8 max-w-3xl mx-auto flex flex-col gap-6 relative">
      
      {/* Background ambient aurora orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-600 blur-[140px]"></div>
      </div>

      {/* Header sections */}
      <div className="z-10 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-300 uppercase tracking-wider mb-2">
          <Inbox size={11} className="text-indigo-400" />
          <span>Pending Invitations</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Connection Invitations</h2>
        <p className="text-slate-400 text-xs mt-1">Review incoming connection requests from elite engineers who want to network with you.</p>
      </div>

      {/* Structured horizontal banners list */}
      <div className="flex flex-col gap-4 z-10 mt-2">
        {requests
          .filter((request) => request.fromUserId !== null) // Filter out null fromUserId
          .map((request) => {
            const { _id, firstName, lastName, photoUrl, age, about } = request.fromUserId;

            return (
              <div
                key={request._id}
                className="w-full bg-[#0F1322] border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-300 hover:border-violet-500/10 hover:bg-[#151A29]/40 shadow-lg"
              >
                
                {/* Left side details (avatar + metadata) */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 min-w-0 flex-1 text-center sm:text-left">
                  
                  {/* Round avatar */}
                  <div className="w-14 h-14 rounded-full border border-white/10 overflow-hidden bg-slate-950 shrink-0">
                    <img
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                      src={photoUrl}
                    />
                  </div>

                  {/* Text descriptions */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-extrabold text-base text-white tracking-tight truncate">
                      {`${firstName} ${lastName || ""}`}{age ? `, ${age}` : ""}
                    </h3>
                    <p className="text-xs text-indigo-300 font-extrabold truncate">
                      {getMockRole(firstName)}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <MapPin size={10} className="text-slate-500" />
                      <span>{getMockLocation(firstName)}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed italic mt-3 line-clamp-2 pr-2">
                      &ldquo;{about || "Hey there! Let's connect on devTinder and share engineering insights."}&rdquo;
                    </p>
                  </div>

                </div>

                {/* Right side CTAs */}
                <div className="flex items-center gap-3 shrink-0">
                  
                  {/* Reject option */}
                  <button
                    onClick={() => reviewRequest("rejected", request._id)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-black transition-all duration-200 outline-none focus:outline-none"
                    title="Reject invitation"
                  >
                    <X size={12} className="stroke-[3]" />
                    <span>REJECT</span>
                  </button>

                  {/* Accept option */}
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-black transition-all duration-200 outline-none focus:outline-none"
                    title="Accept invitation"
                  >
                    <Check size={12} className="stroke-[3]" />
                    <span>ACCEPT</span>
                  </button>

                </div>

              </div>
            );
          })}
      </div>

    </div>
  );
}

export default Requests;
