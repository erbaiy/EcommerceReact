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
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#060818]">
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

      {/* Sidebar - fixed position */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content area with header */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0 lg:ml-20'}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="p-6 min-h-[calc(100vh-80px)]">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;