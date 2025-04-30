import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AnimateHeight from "react-animate-height";
import logo from "../../../assets/img/logo.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  // State management
  const [activeMenu, setActiveMenu] = useState("dashboard"); // Set dashboard open by default
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation();

  // Toggle submenu handler
  const toggleSubmenu = (menuName) => {
    setActiveMenu((prev) => prev === menuName ? "" : menuName);
  };

  // Handle initial active menu based on route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const menuLink = document.querySelector(`.sidebar ul a[href="${currentPath}"]`);
    
    if (menuLink) {
      menuLink.classList.add("active");
      const submenu = menuLink.closest("ul.sub-menu");
      
      if (submenu) {
        const parentMenuItem = submenu.closest("li.menu");
        const navLink = parentMenuItem?.querySelector(".nav-link");
        
        if (navLink) {
          // Delayed click to allow component to mount fully
          setTimeout(() => navLink.click(), 0);
        }
      }
    }
  }, []);

  return (
    <nav className={`sidebar fixed min-h-screen ${isCollapsed ? 'w-20' : 'w-64'} 
      shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      <div className="bg-white dark:bg-black h-full">
        {/* Header with logo and collapse button */}
        <div className="flex justify-between items-center px-4 py-3">
          <NavLink to="/" className="flex items-center shrink-0">
            <img
              className="w-8 flex-none"
              src={logo}
              alt="logo"
            />
            {!isCollapsed && (
              <span className="text-2xl ml-1.5 font-semibold dark:text-white-light">
                {t("E-commerce")}
              </span>
            )}
          </NavLink>

          <button 
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-500/10 
              dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            >
              <path
                d="M13 19L7 12L13 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity="0.5"
                d="M16.9998 19L10.9998 12L16.9998 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable menu content */}
        <div 
             
            className="h-[calc(100vh-80px)] overflow-y-auto scroll-container">
          <ul style={{ height: "100%" }} className="relative font-semibold space-y-1 p-4">
            {/* Dashboard menu item */}
            <li className="menu nav-item">
              <button
                type="button"
                className={`nav-link group w-full flex items-center p-2.5 rounded-md ${activeMenu === "dashboard" ? "bg-gray-100 dark:bg-slate-700" : ""}`}
                onClick={() => toggleSubmenu("dashboard")}
              >
                <div className="flex items-center flex-grow">
                  <svg
                    className="shrink-0 group-hover:text-primary"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                      fill="currentColor"
                    />
                    <path
                      d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                      fill="currentColor"
                    />
                  </svg>
                  
                  {!isCollapsed && (
                    <span className="pl-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("dashboard")}
                    </span>
                  )}
                </div>

                {!isCollapsed && (
                  <div className={`transition-transform duration-300 ${activeMenu === "dashboard" ? "rotate-90" : ""}`}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </button>

              {/* Submenu items with animation - open by default */}
              <AnimateHeight
                duration={300}
                height={activeMenu === "dashboard" ? "auto" : 0}
              >
               <ul className="sub-menu text-gray-500 space-y-1 mt-2 list-none">
                 <li>
                   <NavLink
                     to="dashboard/products"
                     className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                   >
                     <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gray-500 dark:text-gray-400 mr-3">
                       <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="1.5" />
                     </svg>
                     {!isCollapsed && <span className="text-sm font-medium">{t("Products")}</span>}
                   </NavLink>
                 </li>
                  <li>
                    <NavLink
                      to="dashboard/payments"
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gray-500 dark:text-gray-400 mr-3">
                        <path d="M2 7h20v10H2V7z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {!isCollapsed && <span className="text-sm font-medium">{t("Payments")}</span>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="dashboard/orders"
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gray-500 dark:text-gray-400 mr-3">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {!isCollapsed && <span className="text-sm font-medium">{t("Orders")}</span>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="dashboard/statistics"
                      className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gray-500 dark:text-gray-400 mr-3">
                        <path d="M4 20V10M12 20V4M20 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {!isCollapsed && <span className="text-sm font-medium">{t("Statistics")}</span>}
                    </NavLink>
                  </li>
                </ul>
              </AnimateHeight>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;