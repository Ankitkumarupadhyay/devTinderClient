import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";

function Footer(): React.ReactElement {
  const location = useLocation();

  // If we are on the landing page, we can hide the default simple footer because LandingPage has its own dedicated rich minimalist footer. This prevents double footer rendering and keeps the page looking absolutely premium!
  if (location.pathname === "/") {
    return <></>;
  }

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Column 1 - Brand description */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white group">
              <span className="text-xl transition-transform group-hover:scale-110">👩‍💻</span>
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
                devTinder
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where software engineers connect, collaborate, learn, and build side-by-side. Swipe right on your next coding partner.
            </p>
          </div>

          {/* Column 2 - Core Platform links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">Platform</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/feed" className="hover:text-white transition-colors">Matches Feed</Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-white transition-colors">Your Connections</Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-white transition-colors">Pending Requests</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Settings links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">Account</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">Edit Profile</Link>
              </li>
              <li>
                <Link to="/forgotpassword" className="hover:text-white transition-colors">Reset Password</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wider uppercase">Community</h4>
            <div className="flex gap-4 items-center mt-1">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider and copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} devTinder. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with ❤️ for developers, by developers.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
