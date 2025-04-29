"use client"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { X } from "lucide-react"

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  const { t } = useTranslation()

  if (!isOpen || !product) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-slate-700">
          <h2 className="text-xl font-bold dark:text-white">{t("Product Details")}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Product ID")}</h3>
                <p className="mt-1 text-sm dark:text-white">{product._id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Name")}</h3>
                <p className="mt-1 text-sm dark:text-white">{product.name}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Description")}</h3>
              <p className="mt-1 text-sm dark:text-white">{product.description || t("No description available")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Price")}</h3>
                <p className="mt-1 text-sm dark:text-white">${(product.price || product.unitPrice || 0).toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Stock Quantity")}</h3>
                <p className="mt-1 text-sm dark:text-white">{product.stockQuantity || 0}</p>
              </div>
            </div>

            {/* Additional product details can be added here */}
            {product.category && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Category")}</h3>
                <p className="mt-1 text-sm dark:text-white">{product.category}</p>
              </div>
            )}

            {product.createdAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{t("Created At")}</h3>
                <p className="mt-1 text-sm dark:text-white">{new Date(product.createdAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            {t("Close")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProductDetailsModal