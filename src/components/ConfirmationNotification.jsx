import { useEffect } from 'react';
import { User, MapPin, Phone, ShoppingBag, DollarSign, Clock, Coffee } from 'lucide-react';

const ConfirmationNotification = ({ isOpen, message, orderDetails, onConfirm, onDismiss }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !orderDetails) return null;

  const {
    orderId = '',
    customerName = '',
    restaurantName = '',
    address = '',
    phone = '',
    items = [],
    estimatedTime = ''
  } = orderDetails;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {message}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <ShoppingBag className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Order</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">#{orderId}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <User className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Customer</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{customerName}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <Coffee className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Restaurant</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{restaurantName}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <MapPin className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Address</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{address}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <Phone className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{phone}</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <Clock className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Estimated Time</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{estimatedTime}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Items:</h4>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total:</span>
            <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
          </div>
          <div className="flex flex-col sm:flex-row-reverse sm:justify-start">
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-3 sm:mb-0 sm:ml-3"
            >
              Confirm Delivery
            </button>
            <button
              onClick={onDismiss}
              className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationNotification;