import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerVisFunc, loginVisFunc, popupData, popupVisFunc } from '../../features/visibilitySlice';
import { setMyName, setAccessAndRefreshToken } from '../../features/locationSlice.js';
import { useSocket } from '../../useSocket.js';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leaveRoom } = useSocket();
  
  const [isLoading, setLoading] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const joinCode = useSelector(state => state.locations.joinCode);
  const accessToken = useSelector(state => state.locations.accessToken);
  const user = useSelector(state => state.locations.user);

  const showPopup = (message, color) => {
    dispatch(popupData({ message, color }));
    dispatch(popupVisFunc());
    setTimeout(() => {
      dispatch(popupVisFunc());
    }, 3000);
  };

  const handleLogout = async () => {
    setLoading(true);
    setShowUserMenu(false);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/logout`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken })
      });
      
      const data = await response.json();

      if (data.success) {
        leaveRoom(joinCode, user);
        navigate("/");
        showPopup(data.message, "green");
        dispatch(setMyName(""));
        dispatch(setAccessAndRefreshToken({ accessToken: "", refreshToken: "" }));
      } else {
        showPopup(data.message, "red");
      }
    } catch (error) {
      showPopup("Something went wrong!", "red");
    }
    
    setLoading(false);
  };

  const handleAuthClick = () => {
    if (!user) {
      dispatch(loginVisFunc());
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleGetStarted = () => {
    dispatch(registerVisFunc());
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-md sticky top-0 z-[1100]">
      <div className="max-w-9xl mx-auto  sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="text-2xl sm:text-3xl font-bold text-white hover:text-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-lg px-2"
            aria-label="ShareMap Home"
          >
            ShareMap
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!user ? (
              <>
                {/* Login Button */}
                <button
                  onClick={handleAuthClick}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white hover:text-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded-lg"
                  aria-label="Log in"
                >
                  log in
                </button>

                {/* Get Started Button */}
                <button
                  onClick={handleGetStarted}
                  className="px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-blue-600"
                  aria-label="Get started"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                {/* User Button */}
                <button
                  onClick={handleAuthClick}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-white bg-blue-500 hover:bg-blue-400 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate">{user}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                      aria-hidden="true"
                    />
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn">
                      <div className="py-2 px-4 border-b border-gray-200">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">{user}</p>
                      </div>
                      
                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:bg-red-50"
                        aria-label="Log out"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Logging out...
                          </span>
                        ) : (
                          'log out'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}

export default Header;