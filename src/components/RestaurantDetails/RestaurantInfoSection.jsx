import PropTypes from 'prop-types';

import ManagerDetails from "./ManagerDetails";
import RestaurantDetailsInfo from "./RestaurantDetailsInfo";

const RestaurantInfoSection = ({ restaurantData }) => (
  <div>
    <ManagerDetails manager={restaurantData.manager} />
    <RestaurantDetailsInfo restaurantData={restaurantData} />
  </div>
);

RestaurantInfoSection.propTypes = {
  restaurantData: PropTypes.object.isRequired,
};

export default RestaurantInfoSection;