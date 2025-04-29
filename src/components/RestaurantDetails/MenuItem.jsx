import { t } from "i18next";
import { Edit, Trash2 } from "lucide-react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../config/axios";

const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `http://localhost:3005${path}`;
  };

  const handleEditClick = () => {
    navigate(`/dashboard/restaurant-manager/edit-menu-item/${item.id}`, { state: { item } });
  };

  const handleDeleteClick =async () => {
    try {
      console.log("Deleting menu item:", item.id);
    await axiosInstance.delete(`menu-items/${item.id}`);
    toast.success(t("Menu item deleted successfully"));
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error(t("Failed to delete menu item"));
    }

  }

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden animate-fadeInUp">
      <img
        src={getImageUrl(item.image)}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="font-semibold dark:text-white">{item.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
      <p className="text-lg font-bold text-primary mt-2">
        ${item.price.toFixed(2)}
      </p>
      <div className="flex justify-end mt-2">
        <button
          className="text-green-500 mr-2 rounded-full bg-slate-200 dark:bg-slate-800 p-2"
          onClick={handleEditClick}
        >
          <Edit size={16} />
        </button>
        <button className="text-red-500 rounded-full bg-slate-200 dark:bg-slate-800 p-2"
                  onClick={handleDeleteClick}
>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MenuItem;
