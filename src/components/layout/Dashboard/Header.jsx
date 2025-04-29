import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Laptop, Bell, Search, Menu } from "lucide-react";
import Dropdown from "./Dropdown";
import logo from "../../../assets/img/logo-dark.svg"; // Adjust the path as necessary

const Header = () => {
  // State management
  const [searchActive, setSearchActive] = useState(false);
  const [theme, setTheme] = useState('light');
  const [notifications] = useState([]);

  // Theme toggle handler - cycles through light, dark, system
  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <header className="z-40">
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black justify-between">
          {/* Logo & mobile menu button */}
          <div className="flex lg:hidden items-center">
            <Link to="/" className="flex items-center shrink-0">
              <img className="w-8" src={logo} alt="logo" />
              <span className="text-2xl ml-1.5 font-semibold hidden md:inline dark:text-white-light">
                VRISTO
              </span>
            </Link>
            <button
              type="button"
              className="ml-3 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary"
              aria-label="Toggle Menu"
            >
              <Menu size="20" />
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 ml-auto dark:text-[#d0d2d6]">
            {/* Search button */}
            <button
              type="button"
              onClick={() => setSearchActive(!searchActive)}
              className="p-2 rounded-full bg-white-light/40 dark:bg-dark/40"
              aria-label="Toggle Search"
            >
              <Search size="20" />
            </button>

            {/* Theme toggle */}
            <div>
              {theme === "light" && (
                <button
                  className="p-2 rounded-full bg-white-light/40 dark:bg-dark/40"
                  onClick={() => toggleTheme("dark")}
                  aria-label="Switch to Dark Mode"
                >
                  <Sun size="20" />
                </button>
              )}
              {theme === "dark" && (
                <button
                  className="p-2 rounded-full bg-white-light/40 dark:bg-dark/40"
                  onClick={() => toggleTheme("system")}
                  aria-label="Switch to System Mode"
                >
                  <Moon size="20" />
                </button>
              )}
              {theme === "system" && (
                <button
                  className="p-2 rounded-full bg-white-light/40 dark:bg-dark/40"
                  onClick={() => toggleTheme("light")}
                  aria-label="Switch to Light Mode"
                >
                  <Laptop size="20" />
                </button>
              )}
            </div>

            {/* Notifications dropdown */}
            <div className="dropdown">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40"
                button={(
                  <span className="relative">
                    <Bell size="20" />
                    {notifications.length > 0 && (
                      <span className="absolute w-3 h-3 right-0 top-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/50"></span>
                        <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                      </span>
                    )}
                  </span>
                )}
              >
                <ul className="py-0 text-dark dark:text-white-dark w-[300px] divide-y dark:divide-white/10">
                  {/* Notification header */}
                  <li>
                    <div className="flex items-center px-4 py-2 justify-between font-semibold">
                      <h4 className="text-lg">Notifications</h4>
                      {notifications.length > 0 && (
                        <span className="badge bg-primary/80">{notifications.length} New</span>
                      )}
                    </div>
                  </li>
                  
                  {/* Notification items or empty state */}
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li key={notification.id} className="dark:text-white-light/90">
                        <div className="group flex items-center px-4 py-2">
                          <div className="grid place-content-center rounded">
                            <div className="w-12 h-12 relative">
                              <img
                                className="w-12 h-12 rounded-full object-cover"
                                alt="profile"
                                src={`/assets/images/${notification.profile}`}
                              />
                              <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                            </div>
                          </div>
                          <div className="pl-3 flex flex-auto">
                            <div className="pr-3">
                              <h6>{notification.message}</h6>
                              <span className="text-xs block font-normal dark:text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="ml-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                              aria-label="Remove notification"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className="grid place-content-center text-lg min-h-[200px]">
                        <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="#a9abb6"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-primary rounded-full"
                          >
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                        </div>
                        No notifications available.
                      </div>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>

            {/* User profile dropdown */}
            <div className="dropdown">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="relative group block"
                button={(
                  <img
                    className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/user-profile.jpeg"
                    alt="User profile"
                  />
                )}
              >
                <ul className="text-dark dark:text-white-dark py-0 w-[230px] font-semibold">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="rounded-md w-10 h-10 object-cover"
                        src="/assets/images/user-profile.jpeg"
                        alt="User profile"
                      />
                      <div className="pl-4 truncate">
                        <h4 className="text-base">
                          John Doe
                          <span className="text-xs bg-success-light rounded text-success px-1 ml-2">
                            Pro
                          </span>
                        </h4>
                        <span className="text-black/60 hover:text-primary dark:text-dark-light/60">
                          john@example.com
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/users/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700">
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link to="/auth/boxed-signin" className="block px-4 py-3 text-danger">
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;