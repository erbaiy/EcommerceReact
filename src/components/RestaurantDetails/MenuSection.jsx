import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import MenuItem from "./MenuItem";
import SpinnerIcon from "../../components/SpinnerIcon";
import PropTypes from 'prop-types';

const MenuSection = ({ menu, userRole = 'restaurantManager' ,restoId}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredMenu.slice(0, indexOfLastItem);

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  const handleAddMenuItem = () => {
    const route = userRole === 'superAdmin' 
      ? "/dashboard/super-admin/add-menu-item"
      : "/dashboard/restaurant-manager/add-menu-item/"+restoId;
    navigate(route);
  };

  return (
    <div className="md:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold dark:text-white">{t("Menu")}</h2>
        <button
          className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
          onClick={handleAddMenuItem}
        >
          <Plus size={16} className="mr-2" />
          {t("Add Menu")}
        </button>
      </div>
      <input
        type="text"
        placeholder={t("Search menu...")}
        className="w-full mb-4 p-2 rounded-md border bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-900 dark:border-slate-700 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
      {indexOfLastItem < filteredMenu.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleViewMore}
            disabled={loading}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300"
          >
            {loading ? (
              <>
                <SpinnerIcon className="w-4 h-4 me-3 text-white font-semibold" />
                Loading...
              </>
            ) : (
              t("View More")
            )}
          </button>
        </div>
      )}
    </div>
  );
};

MenuSection.propTypes = {
  menu: PropTypes.array.isRequired,
  userRole: PropTypes.oneOf(['superAdmin', 'restaurantManager'])
};

export default MenuSection;