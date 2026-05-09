import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUser, removeUser } from "../store/userSlice";
import { useAppSelector } from "../store/appStore";
import { useGetProfileQuery, useLogoutMutation } from "../store/tinderApi";
import { User } from "../types";
import { 
  LayoutDashboard, 
  Compass, 
  UserCheck, 
  Users, 
  MessageSquare, 
  User as UserIcon, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown
} from "lucide-react";

function Body(): React.ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const storeUser = useAppSelector((store) => store.user);
  
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const isPrivatePath = ["/feed", "/profile", "/connections", "/requests"].includes(location.pathname);

  // Load profile details with RTK Query (skipping on generic auth paths to prevent raw redirects)
  const isAuthPath = ["/login", "/signup", "/forgotpassword", "/"].includes(location.pathname);
  const { data: profileResponse, error } = useGetProfileQuery(undefined, {
    skip: isAuthPath && !localStorage.getItem("tinderUser"),
  });

  const profileUser = profileResponse?.data;

  const getLocalStorageUser = (): User | null => {
    const raw = localStorage.getItem("tinderUser");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  };

  const localUser = getLocalStorageUser();
  const activeUser = storeUser || profileUser || localUser;

  // Sync profile details upon successful fetch
  useEffect(() => {
    if (profileUser) {
      localStorage.setItem("tinderUser", JSON.stringify(profileUser));
      dispatch(addUser(profileUser));
      if (["/login", "/signup"].includes(location.pathname)) {
        navigate("/feed");
      }
    }
  }, [profileUser, dispatch, location.pathname, navigate]);

  // Handle query session failures
  useEffect(() => {
    if (error) {
      localStorage.removeItem("tinderUser");
      dispatch(removeUser());
      if (isPrivatePath) {
        navigate("/login");
      }
    }
  }, [error, isPrivatePath, dispatch, navigate]);

  const [logout] = useLogoutMutation();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();
      dispatch(removeUser());
      localStorage.removeItem("tinderUser");
      toast.success("Logout successful");
      navigate("/login");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Logout failed");
    }
  };

  const isAuthenticated = !!activeUser;

  // Determine section heading for top bar
  const getSectionTitle = (): string => {
    switch (location.pathname) {
      case "/feed":
        return "Discover Developers";
      case "/connections":
        return "Your Network";
      case "/requests":
        return "Pending Match Requests";
      case "/profile":
        return "Profile Settings";
      default:
        return "Dashboard";
    }
  };

  // Shared Sidebar links list
  const sidebarLinks = [
    { label: "Dashboard", path: "#", icon: <LayoutDashboard size={18} />, badge: "Soon" },
    { label: "Discover", path: "/feed", icon: <Compass size={18} /> },
    { label: "Requests", path: "/requests", icon: <UserCheck size={18} /> },
    { label: "Connections", path: "/connections", icon: <Users size={18} /> },
    { label: "Messages", path: "#", icon: <MessageSquare size={18} />, badge: "Soon" },
    { label: "Profile", path: "/profile", icon: <UserIcon size={18} /> },
  ];

  if (isAuthenticated && isPrivatePath && activeUser) {
    return (
      <div className="flex h-screen w-screen bg-[#090D1A] overflow-hidden text-slate-100 font-sans relative">
        <ToastContainer />

        {/* ====================================================================
            MOBILE OVERLAY BACKDROP & DRAWERS SIDEBAR
            ==================================================================== */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed top-0 bottom-0 left-0 w-64 bg-[#0F1322] border-r border-white/5 z-50 p-6 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div>
            {/* Header logo */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex flex-col text-left">
                <span className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span className="p-1.5 bg-gradient-to-tr from-violet-600 to-pink-600 rounded-lg text-white">🧑‍💻</span>
                  devTinder
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 mt-1">Elite Networking</span>
              </Link>
              <button 
                className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-1.5 text-left">
              {sidebarLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                const isPlaceholder = link.path === "#";
                
                return isPlaceholder ? (
                  <div 
                    key={i} 
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-500 cursor-not-allowed text-sm font-semibold select-none"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider border border-white/5">
                        {link.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  <Link
                    key={i}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      isActive 
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/15" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400 transition-colors"}`}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Upgrade Banner */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-500/10 p-4 rounded-2xl text-center relative overflow-hidden mb-4">
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 blur-xl pointer-events-none"></div>
              <p className="text-xs font-bold text-indigo-300">Unlock Premium Leads</p>
              <p className="text-[10px] text-slate-400 mt-1">Chat directly with premium recruiters.</p>
            </div>
            <button className="w-full bg-[#B2B5FF] hover:bg-[#A3A6FF] text-[#1E1B4B] font-black text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/10 active:scale-95">
              UPGRADE TO PRO
            </button>
          </div>
        </aside>

        {/* ====================================================================
            MAIN RIGHT PORTION: TOP BAR + VIEWPORT VIEW
            ==================================================================== */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          
          {/* Top horizontal Header bar */}
          <header className="h-16 border-b border-white/5 bg-[#0F1322]/80 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between shrink-0 relative z-30">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">{getSectionTitle()}</h2>
            </div>

            {/* Profile Dropdown actions */}
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-slate-950 shrink-0">
                  <img 
                    src={activeUser.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} 
                    alt="User profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="hidden sm:flex flex-col text-left mr-1">
                  <span className="text-xs font-bold text-white leading-tight">{activeUser.firstName}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider leading-none mt-0.5">Developer</span>
                </div>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </button>

              {/* Float Dropdown card */}
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-52 bg-[#0F1322] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link 
                      to="/profile" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <UserIcon size={14} className="text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Core scroll content area */}
          <main className="flex-1 overflow-y-auto bg-[#090D1A] relative z-10">
            <Outlet />
          </main>

        </div>
      </div>
    );
  }

  // Guest view (Landing, Login, Signup, ForgotPassword etc.)
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col justify-between">
      <ToastContainer />
      <Navbar />
      <div className="flex-1 flex flex-col justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Body;
