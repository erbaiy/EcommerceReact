import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ChevronsLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AnimateHeight from "react-animate-height";
import { useState, useEffect } from "react";
import { SolarMenuDotsSquareBold } from "../../icons/SolarMenuDotsSquareBold";
import { MaterialSymbolsDashboardCustomizeRounded } from "../../icons/MaterialSymbolsDashboardCustomizeRounded";
import { MaterialSymbolsLightOrderApprove } from "../../icons/MaterialSymbolsLightOrderApprove";
import { Restaurant } from "../../icons/Restaurant";

const DriverSideBar = () => {
  const [currentMenu, setCurrentMenu] = useState("");
  const themeConfig = useSelector((state) => state.themeConfig);
  const semidark = useSelector((state) => state.themeConfig.semidark);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toggleMenu = (value) => {
    setCurrentMenu((oldValue) => (oldValue === value ? "" : value));
  };

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [dispatch, themeConfig.sidebar]);

  return (
    <div className={semidark ? "dark" : ""}>
      <nav className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[270px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? "text-white-dark" : ""}`}>
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className="main-logo flex items-center shrink-0">
              <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                {t("FoodFlow Driver")}
              </span>
            </NavLink>
            <button type="button" className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180" onClick={() => dispatch(toggleSidebar())}>
            <ChevronsLeft color="#64748b" size="20" />
            </button>
          </div>
          <div className="h-[calc(100vh-80px)] relative overflow-y-auto scroll-container">
            <ul className="relative font-semibold space-y-0.5 p4 py-0">
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === "dashboard" ? "active" : ""} nav-link group w-full`} onClick={() => toggleMenu("dashboard")}>
                  <div className="flex items-center">
                  <MaterialSymbolsDashboardCustomizeRounded className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("Dashboard")}
                    </span>
                  </div>
                  <div className={currentMenu === "dashboard" ? "rotate-90" : "rtl:rotate-180"}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                <AnimateHeight duration={300} height={currentMenu === "dashboard" ? "auto" : 0}>
                  <ul className="sub-menu text-gray-500 m-0">
                    <li>
                      <NavLink to="/analytics">{t("Analytics")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
              <h2 className="py-3 px-7 text-sm flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <svg
                  className="w-4 h-5 flex-none hidden"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className='text-[0.85rem]'>{t("Orders")}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "orders" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("orders")}
                >
                  <div className="flex items-center">
                  <MaterialSymbolsLightOrderApprove className="group-hover:!text-primary shrink-0 w-7 h-7" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("Order Management")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu === "orders"
                        ? "rotate-90"
                        : "rtl:rotate-180"
                    }
                  >
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
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "orders" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500 m-0">
                    <li>
                      <NavLink to="/dashboard/driver/DriverDeliveryOrders"> {t("View  Orders Asyn to me")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/driver/HistoryDriver"> {t("View   My Orders History ")}</NavLink>
                    </li>
                   
                  </ul>
                </AnimateHeight>
                
              </li>

              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DriverSideBar;