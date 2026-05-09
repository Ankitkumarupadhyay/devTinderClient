import React from "react";
import { User } from "../types";
import { MessageSquare, MapPin } from "lucide-react";

interface ConnectionCardProps {
  user: User;
}

function ConnectionCard({ user }: ConnectionCardProps): React.ReactElement {
  const { firstName, lastName, photoUrl, age, about } = user;

  // Dynamically assign cool developer stacks based on name value to provide ultra-realistic feedback
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
    <div className="w-full bg-[#0F1322] border border-white/5 rounded-2xl p-5 hover:border-violet-500/20 hover:bg-[#151A29]/40 transition-all duration-300 flex flex-col justify-between text-left group shadow-lg">
      
      <div>
        {/* Header row (Avatar, Title details) */}
        <div className="flex items-start gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <div className="w-full h-full rounded-full border border-white/10 overflow-hidden bg-slate-950">
              <img
                src={photoUrl}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt="user-img"
              />
            </div>
            {/* Active pulsing status marker */}
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0F1322] animate-pulse"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-base text-white tracking-tight truncate">
              {`${firstName} ${lastName || ""}`}{age ? `, ${age}` : ""}
            </h3>
            <p className="text-xs text-indigo-300 font-extrabold truncate">
              {getMockRole(firstName)}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <MapPin size={10} className="text-slate-500" />
              <span>{getMockLocation(firstName)}</span>
            </div>
          </div>
        </div>

        {/* Short About Description */}
        <p className="text-xs text-slate-400 leading-relaxed italic mt-4 pl-1 border-l-2 border-white/5 line-clamp-2">
          &ldquo;{about || "Let's match and build outstanding open source projects together!"}&rdquo;
        </p>
      </div>

      {/* Action Footer Button */}
      <div className="mt-5">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-black tracking-wider text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 hover:opacity-95 active:scale-95 transition-all">
          <MessageSquare size={13} className="stroke-[2.5]" />
          <span>START CHAT</span>
        </button>
      </div>

    </div>
  );
}

export default ConnectionCard;
