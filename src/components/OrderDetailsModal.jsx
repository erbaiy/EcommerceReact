import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, User, MapPin, Phone, ShoppingBag, DollarSign, Clock } from 'lucide-react';
import PropTypes from 'prop-types';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  const { t } = useTranslation();

  const calculateTotal = () => {
    return order.items.reduce((acc, item) => acc +item.product.unitPrice, 0);
  };

  if (!isOpen || !order) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 max-w-2xl w-full overflow-hidden shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-slate-800">
          <h2 className="text-2xl font-bold dark:text-slate-400">{t('Order Details')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card icon={<User size={24} />} title={t('Customer')}>
              <p className="text-gray-600 dark:text-gray-300">{order.customer.email}</p>
            </Card>
            <Card icon={<MapPin size={24} />} title={t('Address')}>
              <p className="text-gray-600 dark:text-gray-300">{order.customer.address}</p>
            </Card>
            <Card icon={<Phone size={24} />} title={t('Phone')}>
              <p className="text-gray-600 dark:text-gray-300">{order.customer.phoneNumber}</p>
            </Card>
            <Card icon={<Clock size={24} />} title={t('Status')}>
              <span className={`px-2 py-1 rounded-full text-sm font-semibold
                ${order.isPayed === "completed" ? 'bg-green-500 text-white' : 
                  order.isPayed === "pending" ? 'bg-red-500 text-white' : 
                  'bg-yellow-500 text-white text-sm font-medium'}`}>
                {t(order.isPayed)}
              </span>
            </Card>
          </div>
          <Card icon={<ShoppingBag size={24} />} title={t('Items')}>
            <ul className="space-y-2">
              {order.items?.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="dark:text-white">x{item.quantity}</span>
                  {/* <span className="dark:text-white">${item.menuItem.unitPrice?.toFixed(2) || '0.00'}</span> */}
                </li>
              ))}
            </ul>
          </Card>
          <Card icon={<DollarSign size={24} />} title={t('Total')}>
            <p className="text-xl font-semibold dark:text-white">${calculateTotal()}</p>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Card = ({ icon, title, children }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow">
    <div className="flex items-center mb-2">
      <div className="mr-2 text-primary dark:text-primary-light">{icon}</div>
      <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
    </div>
    {children}
  </div>
);

// OrderDetailsModal.propTypes = {
//   order: PropTypes.shape({
//     // id: PropTypes.number.isRequired,
//     customerName: PropTypes.string.isRequired,
//     items: PropTypes.arrayOf(PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       quantity: PropTypes.number.isRequired,
//       unitPrice: PropTypes.number.isRequired,
//     })).isRequired,
//     total: PropTypes.number.isRequired,
//     status: PropTypes.string.isRequired,
//     address: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//   }),
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

Card.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default OrderDetailsModal;
