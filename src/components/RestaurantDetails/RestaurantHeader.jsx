import PropTypes from 'prop-types';

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  
  // If it already includes the full URL, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the API host
  // Make sure the path doesn't have duplicate slashes
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `http://localhost:3005${path}`;
};

const RestaurantHeader = ({ restaurantData,onEditRestaurant  }) => (
  <div className="relative h-64">
    <img
      src={getImageUrl(restaurantData.banner)}
      alt={restaurantData.name}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6 flex items-end">
      <img
        src={getImageUrl(restaurantData.logo)}
        alt={restaurantData.name}
        className="w-24 h-24 rounded-full border-4 border-white mr-4"
      />
      <div className="text-white">
        <h1 className="text-3xl font-bold">{restaurantData.name}</h1>
        <p className="text-sm">{restaurantData.cuisineType}</p>
      </div>
    </div>
    <button 
                onClick={onEditRestaurant} 
                className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded"
            >
                Edit Restaurant
            </button>

  </div>
);

RestaurantHeader.propTypes = {
  restaurantData: PropTypes.object.isRequired,
};

export default RestaurantHeader;
