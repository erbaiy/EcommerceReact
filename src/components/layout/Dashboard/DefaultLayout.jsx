import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Loader from "../../Loader";

const DefaultLayout = () => {
  // State management
  const [showLoader, setShowLoader] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Functions
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Event handlers
  const handleScroll = () => {
    setShowTopButton(window.scrollY > 50);
  };
  
  // Side effects
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    // Handle initial screen loader animation
    const screenLoader = document.querySelector(".screen_loader");
    if (screenLoader) {
      screenLoader.classList.add("animate__fadeOut");
      setTimeout(() => {
        setShowLoader(false);
      }, 200);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
return (
  <div className="relative">
    {isSidebarOpen && (
      <button
        className="fixed inset-0 bg-black/60 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Close Sidebar"
      />
    )}

    {showLoader && (
      <div className="screen_loader fixed inset-0 bg-[#fafafa] dark:bg-[#060818] z-[60] grid place-content-center animate__animated">
        <Loader />
      </div>
    )}

    <div className="fixed bottom-6 right-6 z-50">
      {showTopButton && (
        <button
          type="button"
          className="btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary"
          onClick={goToTop}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7l4-4m0 0l4 4m-4-4v18"
            />
          </svg>
        </button>
      )}
    </div>

    <div className="main-container text-black dark:text-white-dark min-h-screen flex">
  {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

  {/* Main content */}
  <div className="flex-1 flex flex-col min-h-screen">
    <Header />
    <Suspense fallback={<Loader />}>
      <div className="p-6 animate__animated">
        <Outlet />
      </div>
    </Suspense>
  </div>
</div>

  </div>
);

};

export default DefaultLayout;