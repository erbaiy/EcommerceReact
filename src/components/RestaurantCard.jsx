import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const RestaurantCard = ({ restaurant, onViewDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary">
          <img
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-center dark:text-white mb-1 line-clamp-1">
          {restaurant.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {restaurant.owner}
        </p>
        <div className="w-full space-y-2">
          <div className="flex items-start">
            <MapPin
              size={16}
              className="text-primary mr-2 mt-1 flex-shrink-0"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {restaurant.address}
            </p>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="text-primary mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {restaurant.email}
            </p>
          </div>
          <div className="flex items-center">
            <Phone
              size={16}
              className="text-primary mr-2 flex-shrink-0"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {restaurant.phone}
            </p>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(restaurant.id)}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
        >
          {t("View Details")}
        </button>
      </div>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default RestaurantCard;