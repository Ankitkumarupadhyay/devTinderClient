import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/appStore";
import { removeUser } from "../store/userSlice";
import { useLogoutMutation } from "../store/tinderApi";
import { toast } from "react-toastify";
import { User } from "../types";
import { Menu, X } from "lucide-react";

function Navbar(): React.ReactElement {
  const storeUser = useAppSelector((store) => store.user);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLocalStorageUser = (): User | null => {
    const raw = localStorage.getItem("tinderUser");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  };

  const [user, setuser] = useState<User | null>(getLocalStorageUser());

  useEffect(() => {
    setuser(getLocalStorageUser());
  }, [storeUser]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const isLandingPage = location.pathname === "/";

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (!isLandingPage) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isLandingPage 
        ? "bg-[#0B1120]/75 backdrop-blur-md border-b border-white/5" 
        : "bg-base-300 border-b border-white/5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white group">
              <span className="text-2xl transition-transform group-hover:scale-110">👩‍💻</span>
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
                devTinder
              </span>
            </Link>
          </div>

          {/* Landing Page Guest Navigation Links */}
          {isLandingPage && !user && (
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection("features")} 
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("how-it-works")} 
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection("showcase")} 
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Showcase
              </button>
              <button 
                onClick={() => scrollToSection("faq")} 
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                FAQs
              </button>
            </nav>
          )}

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated Actions
              <div className="flex items-center gap-4">
                <Link to="/feed" className="btn btn-sm btn-ghost text-slate-300 hover:text-white font-medium">
                  Matches Feed
                </Link>
                <div className="form-control text-sm font-semibold text-slate-300">
                  Welcome, {user.firstName}
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar border border-white/10"
                  >
                    <div className="w-9 rounded-full">
                      <img src={user.photoUrl} alt="user profile" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-slate-900 border border-white/10 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl"
                  >
                    <li>
                      <Link to="/profile" className="justify-between hover:bg-white/10 text-slate-200">
                        Profile
                        <span className="badge badge-primary badge-sm">Edit</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/connections" className="hover:bg-white/10 text-slate-200">Connections</Link>
                    </li>
                    <li>
                      <Link to="/requests" className="hover:bg-white/10 text-slate-200">Requests</Link>
                    </li>
                    <div className="divider my-1 opacity-20"></div>
                    <li>
                      <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="hover:bg-red-500/20 text-red-400 hover:text-red-300">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // Unauthenticated/Landing Guest Actions
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-pink-500 rounded-xl transition-all duration-300 group-hover:opacity-90"></span>
                  <div className="relative px-4 py-2 bg-[#0B1120] rounded-[11px] text-sm font-medium text-white transition-all duration-300 group-hover:bg-transparent">
                    Get Started Free
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          {isLandingPage && !user && (
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-1"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isLandingPage && !user && mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1120]/95 backdrop-blur-xl border-b border-white/5">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
            >
              Showcase
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
            >
              FAQs
            </button>
            <div className="divider opacity-10 my-2"></div>
            <div className="flex flex-col gap-2 p-2">
              <Link
                to="/login"
                className="btn btn-outline btn-sm border-white/10 text-white w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary btn-sm bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
