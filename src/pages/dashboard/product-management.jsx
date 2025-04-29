"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Search, Eye, Edit, Trash, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "sonner"
import axiosInstance from "../../config/axios"
import ProductDetailsModal from "../../components/ProductDetailsModal"
import ProductFormModal from "../../components/ProductFormModal"

const ProductManagement = () => {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:3000/products")
      const normalizedProducts = res.data.map((product) => ({
        ...product,
        price: product.price || product.unitPrice,
      }))
      setProducts(normalizedProducts)
      setFilteredProducts(normalizedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error(t("Failed to fetch products"))
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || product._id?.toString().includes(searchTerm)
    )
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsDetailsModalOpen(true)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsEditMode(false)
    setIsFormModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setIsEditMode(true)
    setIsFormModalOpen(true)
  }

  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!productToDelete) return

    try {
      await axiosInstance.delete(`http://localhost:3000/products/${productToDelete._id}`)
      setProducts(products.filter((p) => p._id !== productToDelete._id))
      toast.success(t("Product deleted successfully"))
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error(t("Failed to delete product"))
    } finally {
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false)
    setSelectedProduct(null)
  }

  const closeFormModal = () => {
    setIsFormModalOpen(false)
    setSelectedProduct(null)
    setIsEditMode(false)
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditMode) {
        await axiosInstance.put(`http://localhost:3000/products/${selectedProduct._id}`, formData)
        setProducts(products.map((p) => (p._id === selectedProduct._id ? { ...p, ...formData } : p)))
        toast.success(t("Product updated successfully"))
      } else {
        const res = await axiosInstance.post("http://localhost:3000/products", formData)
        setProducts([...products, res.data])
        toast.success(t("Product added successfully"))
      }
      closeFormModal()
    } catch (error) {
      console.error("Error saving product:", error)
      toast.error(t("Failed to save product"))
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-slate-900 rounded-md shadow-md">
      <Toaster richColors />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">{t("Product Management")}</h1>
        <button
          onClick={handleAddProduct}

          className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded"

        >
          <Plus size={18} className="mr-2" />
          {t("Add Product")}
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder={t("Search products...")}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-md overflow-x-auto shadow">
  <table className="min-w-full table-auto">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Product ID")}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Name")}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Price")}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Stock")}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-700">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{product._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{product.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">${(product.price || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{product.stockQuantity || 0}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleViewDetails(product)} className="text-indigo-600 hover:text-indigo-800">
                      <Eye size={20} />
                    </button>
                    <button onClick={() => handleEditProduct(product)} className="text-amber-600 hover:text-amber-800">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDeleteClick(product)} className="text-red-600 hover:text-red-800">
                      <Trash size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center dark:text-white">
                  {t("No products found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isDetailsModalOpen && (
          <ProductDetailsModal product={selectedProduct} isOpen={isDetailsModalOpen} onClose={closeDetailsModal} />
        )}
        {isFormModalOpen && (
          <ProductFormModal
            product={selectedProduct}
            isOpen={isFormModalOpen}
            onClose={closeFormModal}
            onSubmit={handleFormSubmit}
            isEditMode={isEditMode}
          />
        )}
      </AnimatePresence>

      {/* Native Confirm Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">{t("Confirm Deletion")}</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {t("Are you sure you want to delete this product? This action cannot be undone.")}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                {t("Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement
