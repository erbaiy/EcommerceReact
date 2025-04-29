import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const RestaurantDetailsInfo = ({ restaurantData }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {t("Restaurant Details")}
      </h2>
      <div className="space-y-2">
        <p className="flex items-center">
          <MapPin size={16} className="mr-2" />
          {restaurantData.address}
        </p>
      </div>
    </div>
  );
};

RestaurantDetailsInfo.propTypes = {
  restaurantData: PropTypes.object.isRequired,
};

export default RestaurantDetailsInfo;