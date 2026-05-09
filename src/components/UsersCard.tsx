import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import { useSendConnectionRequestMutation } from "../store/tinderApi";
import { User } from "../types";
import { Heart, X, MapPin } from "lucide-react";

interface UsersCardProps {
  user: User;
}

function UsersCard({ user }: UsersCardProps): React.ReactElement {
  const { _id, firstName, lastName, age, about, photoUrl } = user;
  const [showButton, setShowButton] = useState<boolean>(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const [sendConnectionRequest] = useSendConnectionRequestMutation();

  const handleFeed = async (status: "ignored" | "interested", userId: string): Promise<void> => {
    try {
      await sendConnectionRequest({ status, userId }).unwrap();
      dispatch(removeUserFromFeed(userId));
    } catch {
      //
    }
  };

  useEffect(() => {
    if (location.pathname === "/profile") {
      setShowButton(false);
    }
  }, [location]);

  // Dynamically assign cool developer stacks based on name value to provide ultra-realistic feedback
  const getMockSkills = (name: string): string[] => {
    const charCodeSum = name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const skillSets = [
      ["React", "TypeScript", "TailwindCSS", "Next.js", "Node.js"],
      ["Python", "FastAPI", "Docker", "PostgreSQL", "Redis"],
      ["Golang", "Kubernetes", "Docker", "gRPC", "AWS"],
      ["Vue.js", "GraphQL", "TailwindCSS", "Node.js", "MongoDB"],
      ["AWS", "Terraform", "CI/CD", "Docker", "Linux"],
      ["Java", "Spring Boot", "MySQL", "Docker", "AWS"]
    ];
    return skillSets[charCodeSum % skillSets.length];
  };

  // Dynamically assign cool professional roles based on name value to provide ultra-realistic feedback
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

  const expYears = age ? Math.max(1, age - 21) : 3;

  return (
    <div className="flex flex-col items-center">

      {/* Main Wide Card Container */}
      <div className="w-full max-w-xl bg-[#0F1322] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative text-left">

        {/* Upper Image Section with floating credentials */}
        <div className="w-full h-80 sm:h-[400px] relative bg-slate-950 overflow-hidden">
          <img
            src={photoUrl}
            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
            alt="Developer Profile"
          />

          {/* Availability Pulse badge */}
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-[9px] font-extrabold text-green-400 flex items-center gap-1.5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span>AVAILABLE FOR HIRE</span>
          </div>

          {/* Portrait Cover overlay gradient for readability */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F1322] via-[#0F1322]/40 to-transparent"></div>

          {/* Floating Details Inside Photo */}
          <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {`${firstName} ${lastName || ""}`}{age ? `, ${age}` : ""}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-300 font-extrabold mt-0.5 tracking-wide">
              {getMockRole(firstName)}
            </p>

            {/* Map Pin Location details */}
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <MapPin size={12} className="text-slate-500" />
              <span>{getMockLocation(firstName)}</span>
            </div>
          </div>
        </div>

        {/* Card Body Details Section */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">

          {/* BIO & EXP Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">

            {/* Bio info */}
            <div className="sm:col-span-9 text-left">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Bio</span>
              <p className="text-sm text-slate-300 leading-relaxed mt-1.5 italic font-medium">
                &ldquo;{about || "Let's connect and build some game-changing projects together!"}&rdquo;
              </p>
            </div>

            {/* Exp info */}
            <div className="sm:col-span-3 text-left sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Exp</span>
              <p className="text-2xl font-black text-white leading-none mt-1">
                {expYears} <span className="text-xs text-slate-400 font-bold">YRS</span>
              </p>
            </div>

          </div>

          {/* TECH STACK capsule elements */}
          <div className="text-left">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Tech Stack</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {getMockSkills(firstName).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-xl text-xs font-bold text-slate-300 border border-white/5 bg-[#1C2333]/80 hover:bg-[#252E46] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Floating Action control triggers underneath the main wide card */}
      {showButton && (
        <div className="flex items-center justify-center gap-6 mt-6">

          {/* Ignore/X trigger */}
          <button
            onClick={() => handleFeed("ignored", _id)}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-[#151A29]/90 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-400 hover:bg-red-500/5 shadow-xl hover:scale-110 active:scale-95 transition-all outline-none focus:outline-none"
            title="Ignore"
          >
            <X size={22} className="stroke-[2.5]" />
          </button>

          {/* Like/Heart trigger */}
          <button
            onClick={() => handleFeed("interested", _id)}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-[#151A29]/90 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 shadow-xl hover:scale-110 active:scale-95 transition-all outline-none focus:outline-none"
            title="Send Match / Connect"
          >
            <Heart size={26} className="stroke-[2.5] fill-transparent hover:fill-cyan-400/10" />
          </button>

        </div>
      )}

    </div>
  );
}

export default UsersCard;
