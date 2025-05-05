"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { X } from "lucide-react"

const ProductFormModal = ({ product, isOpen, onClose, onSubmit, isEditMode }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unitPrice: "",
    stockQuantity: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product && isEditMode) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        unitPrice: (product.unitPrice || product.unitunitPrice || "").toString(),
        stockQuantity: (product.stockQuantity || "").toString(),
      })
    } else {
      setFormData({
        name: "",
        description: "",
        unitPrice: "",
        stockQuantity: "",
      })
    }
    setErrors({})
  }, [product, isEditMode])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = t("Name is required")
    if (!formData.unitPrice.trim()) {
      newErrors.unitPrice = t("unitPrice is required")
    } else if (isNaN(Number.parseFloat(formData.unitPrice)) || Number.parseFloat(formData.unitPrice) < 0) {
      newErrors.unitPrice = t("unitPrice must be a valid positive number")
    }
    if (formData.stockQuantity.trim() && 
        (isNaN(Number.parseInt(formData.stockQuantity)) || Number.parseInt(formData.stockQuantity) < 0)) {
      newErrors.stockQuantity = t("Stock quantity must be a valid positive number")
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    const submissionData = {
      ...formData,
      unitPrice: Number.parseFloat(formData.unitPrice),
      stockQuantity: formData.stockQuantity ? Number.parseInt(formData.stockQuantity) : 0,
    }
    onSubmit(submissionData)
  }

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
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b dark:border-slate-700">
            <h2 className="text-xl font-bold dark:text-white">
              {isEditMode ? t("Edit Product") : t("Add New Product")}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Product Name")} *
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("Enter product name")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 dark:text-white`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Description")}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t("Enter product description")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("unitPrice")} *
              </label>
              <input
                id="unitPrice"
                name="unitPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.unitPrice}
                onChange={handleChange}
                placeholder={t("Enter unitPrice")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.unitPrice ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 dark:text-white`}
              />
              {errors.unitPrice && <p className="mt-1 text-sm text-red-500">{errors.unitPrice}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Stock Quantity")}
              </label>
              <input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder={t("Enter stock quantity")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.stockQuantity ? "border-red-500" : "border-gray-300 dark:border-slate-600"
                } bg-white dark:bg-slate-700 dark:text-white`}
              />
              {errors.stockQuantity && <p className="mt-1 text-sm text-red-500">{errors.stockQuantity}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-6 border-t dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditMode ? t("Update Product") : t("Add Product")}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ProductFormModal