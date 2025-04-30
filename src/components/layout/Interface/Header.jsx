import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu,
  X,
  Moon,
  Sun,
  Laptop,
  Bell,
  ShoppingBasket,
  Trash2,
  Check,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../../../assets/img/home-illustration.svg";
import profile from "../../../assets/img/home-illustration.svg";
import logoDark from "../../../assets/img/home-illustration.svg";
import ConfirmationNotification from '../../ConfirmationNotification';
import axiosInstance from '../../../config/axios';

const Header = () => {
  // State management
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [theme, setTheme] = useState('light'); // Instead of redux theme
  const [basketItems, setBasketItems] = useState([]); // Instead of redux cart
  const [totalAmount, setTotalAmount] = useState(0); // Instead of redux cart total
  const userAuth=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [user, setUser] = useState({
    fullName:userAuth ? userAuth.fullName : 'John Doe',
    email: userAuth ? userAuth.email : 'ex@gmal.com',
    role: userAuth? userAuth.role:'client'// example role
  }); // Instead of redux auth user

  
  const [confirmationMessage, setConfirmationMessage] = useState({
    orderId: '',
    customerName: '',
    address: '',
    items: []
  });
  

  const LogOut = async () => {
    // try {
        // const response = await axiosInstance.post("/auth/logout");

        // console.log("Logout response:", response);

        // Check if the response is successful
        // if (response.status === 201) {
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            navigate("/login");
        // } else {
            // console.error("Logout failed:", response);
    //     }
    // } catch (error) {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         console.error("Error during logout, response data:", error.response.data);
    //         console.error("Error status:", error.response.status);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         console.error("No response received:", error.request);
    //     } else {
    //         // Something happened in setting up the request
    //         console.error("Error in setting up request:", error.message);
    //     }
    // }
};

  // Hooks
  const navigate = useNavigate();
  const basketMenuRef = useRef(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
    if (mobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  }, [mobileDrawerOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileDrawerOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (basketMenuRef.current && !basketMenuRef.current.contains(event.target)) {
        setBasketOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Mock notification data
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmationMessage({
        orderId: '12345',
        customerName: 'John Doe',
        restaurantName: 'Burger Palace',
        address: '123 Main St, Anytown, AN 12345',
        items: [
          { name: 'Cheeseburger', quantity: 2 },
          { name: 'Fries', quantity: 1 },
          { name: 'Soda', quantity: 2 }
        ]
      });
      setShowConfirmation(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Mock basket data (replacing Redux)
  useEffect(() => {
    // Set some mock data for the basket
    setBasketItems([
      { 
        id: 1, 
        name: 'shoes', 
        price: 6.99, 
        quantity: 2, 
        image: 'uploads/menu/burger.jpg' 
      },
      
    ]);
    
    // Calculate total amount based on basket items
    const total = [
      { id: 1, price: 6.99, quantity: 2 },
      { id: 2, price: 9.99, quantity: 1 }
    ].reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    
    setTotalAmount(total);
  }, []);

  // Handlers
  const toggleBasket = () => {
    setBasketOpen(!basketOpen);
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const handleRemoveFromCart = (id) => {
    // Remove item from cart
    const updatedItems = basketItems.filter(item => item.id !== id);
    setBasketItems(updatedItems);
    
    // Update total amount
    const newTotal = updatedItems
      .reduce((sum, item) => sum + (item.price * item.quantity), 0)
      .toFixed(2);
    setTotalAmount(newTotal);
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    setIsModalOpen(false);
  };

  const handleDismissConfirmation = () => {
    setShowConfirmation(false);
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const calculateTotalPrice = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const handleViewCart = () => {
    setBasketOpen(false);
    navigate("/cart");
  };

  // Render functions
  const renderNavLinks = () => (
    <>
      
      <li>
        <Link to="/products" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
         Products
        </Link>
      </li>
      <li>
        <Link to="/#about" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          About Us
        </Link>
      </li>
      <li>
        <Link to="/#services" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          Services
        </Link>
      </li>
      <li>
        <Link to="/#contact" className="hover:text-orange-500 transition-colors duration-300 text-slate-900 dark:text-slate-50 font-medium">
          Contact Us
        </Link>
      </li>
    </>
  );

  const renderAuthButtons = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return isAuthenticated ? (
    <div className="dropdown shrink-0 flex">
      <div className="relative block">
        <img
          className="w-9 h-9 rounded-full object-cover saturate-50 hover:saturate-100 cursor-pointer"
          src={profile}
          alt="userProfile"
          onClick={toggleDropdown}
        />
        <ul className={`absolute right-0 mt-2 text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
          <li>
            <div className="flex items-center px-4 py-4 gap-6">
                 <img
                   className="rounded-md w-10 h-10 object-cover"
                   src={profile}
                   alt="userProfile"
                 />
                 <div className="ltr:pl-4 rtl:pr-4 truncate">
                   <p className="text-base">{user.fullName}</p>
                   <button
                     type="button"
                     className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                   >
                     {user.email}
                   </button>
                 </div>
               </div>      
          </li>
           <li>
            <Link to="/users/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg
                className="ltr:mr-2 rtl:ml-2 shrink-0 inline-block"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="6"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  opacity="0.5"
                  d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Profile
            </Link>
          </li>
          {(user.role === 'admin' || user.role === 'client') && (
            <>
              <li className="border-t border-white-light dark:border-white-light/10">
                <Link
                  to={
                   
                      "/dashboard/statistics"
                  }
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-danger !py-3"
                >
                  <svg
                    className="ltr:mr-2 rtl:ml-2 shrink-0 inline-block"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                      fill="currentColor"
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
            </>
          )}
          {user && (
            <li className="border-t border-white-light dark:border-white-light/10">
              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-danger !py-3"
              onClick={LogOut}>
                <svg
                  className="ltr:mr-2 rtl:ml-2 rotate-90 shrink-0 inline-block"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign Out
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <div className="flex space-x-4">
      <Link to="/login" className="py-1.5 px-2 border rounded-md text-slate-900 dark:text-slate-50 hover:text-slate-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300">
        Sign In
      </Link>
      <Link to="/register" className="py-1.5 px-2 text-white rounded-md bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-colors duration-300">
        Create an account
      </Link>
    </div>
  );
};
  const isDarkMode = theme === 'dark';

  return (
    <nav className={`sticky top-0 z-50 py-3 px-7 ${
      isScrolled ? "backdrop-blur-md" : "bg-slate-50 dark:bg-slate-900"
    } border-b border-slate-200 dark:border-slate-700 transition-all duration-300`}>
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-12 w-24 mr-2"
              src={isDarkMode ? logoDark : logoLight}
              alt="logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <ul className="flex space-x-8">{renderNavLinks()}</ul>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex lg:items-center lg:w-auto">
            <div className="flex items-center">
              {/* Theme Toggle */}
              {theme === "light" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => toggleTheme("dark")}
                >
                  <Sun className="text-slate-900 dark:text-slate-50" size="20" />
                </button>
              )}
              {theme === "dark" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => toggleTheme("system")}
                >
                  <Moon className="text-slate-900 dark:text-slate-50" size="20" />
                </button>
              )}
              {theme === "system" && (
                <button
                  className="flex items-center p-2 mr-8 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  onClick={() => toggleTheme("light")}
                >
                  <Laptop className="text-slate-900 dark:text-slate-50" size="20" />
                </button>
              )}

              {/* Notifications */}
              {isDriver && (
                <div className="dropdown shrink-0 mr-8 relative">
                  <button className="relative block p-2 rounded-full bg-white-light/40 dark:bg-slate-800 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                    <Bell className="text-slate-900 dark:text-slate-50" size="20" />
                    {showConfirmation && (
                      <span className="flex absolute w-3 h-3 right-0 top-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                        <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                      </span>
                    )}
                  </button>
                  
                  <div className="absolute right-0 mt-2 !py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg hidden group-hover:block">
                    <div className="flex items-center px-4 py-2 justify-between font-semibold">
                      <h4 className="text-lg">Notifications</h4>
                      <span className="badge bg-primary/80">
                        {showConfirmation ? 1 : 0} New
                      </span>
                    </div>
                    
                    {showConfirmation && (
                      <div onClick={handleClick} className="cursor-pointer bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-6 w-6 text-green-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3 w-full">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              New order available for delivery:
                            </p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Order #{confirmationMessage.orderId} - Click for details
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!showConfirmation && (
                      <div className="p-4 text-center">No new notifications</div>
                    )}
                  </div>
                </div>
              )}

              {/* Shopping Cart */}
              <div className="relative inline-block mr-8">
                <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center p-1 px-2 text-xs font-semibold text-white bg-primary rounded-full">
                  {basketItems.length}
                </span>
                <button
                  onClick={toggleBasket}
                  className="flex items-center justify-center p-2 rounded-full bg-white-light/40 dark:bg-slate-800 text-gray-700 bg-white"
                >
                  <ShoppingBasket size="20" className="text-slate-900 dark:text-slate-50" />
                </button>
                {basketOpen && (
                  <div ref={basketMenuRef} className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
                    <ul className="py-2">
                      {basketItems.map((item) => (
                        <li key={item.id} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <img src={`${import.meta.env.VITE_API_HOST}/${item.image}`} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
                          <div className="flex-1 space-y-2">
                            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                              {item.name}
                            </h4>
                            <p className="text-sm font-medium text-primary">
                              ${calculateTotalPrice(item.quantity, item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size="18" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-slate-900 dark:text-slate-50">
                          Total:
                        </span>
                        <span className="text-base font-semibold text-primary">
                          ${totalAmount}
                        </span>
                      </div>
                      <button
                        onClick={handleViewCart}
                        className="mt-2 w-full bg-primary text-white text-base font-semibold px-4 py-2 rounded-md hover:bg-primary/80 transition duration-300"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              <div>{renderAuthButtons()}</div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              <Menu color={isDarkMode ? "#f1f5f9" : "#64748b"} size="24" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 h-screen z-20 text-white backdrop-blur-md flex flex-col items-center justify-center lg:hidden">
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <button className="absolute top-4 right-4 z-30" onClick={toggleNavbar}>
                <X color={isDarkMode ? "#f1f5f9" : "#64748b"} size="24" />
              </button>
              <ul className="space-y-4 text-slate-900 dark:text-slate-50">
                {renderNavLinks()}
              </ul>
              <div className="flex flex-col space-y-4 mt-8">
                {renderAuthButtons()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationNotification
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message="New order available for delivery:"
          orderDetails={confirmationMessage}
          onConfirm={handleConfirmOrder}
          onDismiss={handleDismissConfirmation}
        />
      )}
    </nav>
  );
};
 
export default Header;