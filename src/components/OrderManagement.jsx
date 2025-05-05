"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Search, Eye, Check, X, Loader } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "sonner"
import axiosInstance from "../../config/axios"
import OrderDetailsModal from "./OrderDetailsModal"


const OrderManagement = () => {
  const { t } = useTranslation()
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.get("http://localhost:3000/orders")
      setOrders(res.data)
      setFilteredOrders(res.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast.error(t("Failed to fetch orders"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order._id?.toString().includes(searchTerm) ||
        order.customerId?.toString().includes(searchTerm)
    )
    setFilteredOrders(filtered)
  }, [searchTerm, orders])

//  handle view details modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailsModalOpen(true)

    return (
        <OrderDetailsModal
          order={selectedOrder} 
          isOpen={isDetailsModalOpen} 
          onClose={closeDetailsModal} 
          onConfirm={handleConfirmOrder}
        />
      )
}
//  handle close modal 
const closeDetailsModal = () => {
  setIsDetailsModalOpen(false)
  setSelectedOrder(null)
}

  const handleConfirmOrder = async (orderId) => {
    try {
      await axiosInstance.post(`http://localhost:3000/orders/confirm`, { id: orderId })
      toast.success(t("Order confirmed successfully"))
      fetchOrders() // Refresh the list
    } catch (error) {
      console.error("Error confirming order:", error)
      toast.error(t("Failed to confirm order"))
    }
  }


  const getStatusBadge = (status) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case 'confirmed':
        return `${baseClass} bg-green-100 text-green-800`
      case 'pending':
        return `${baseClass} bg-yellow-100 text-yellow-800`
      case 'cancelled':
        return `${baseClass} bg-red-100 text-red-800`
      default:
        return `${baseClass} bg-gray-100 text-gray-800`
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-slate-900 rounded-md shadow-md">
      <Toaster richColors />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">{t("Order Management")}</h1>
      </div>

      {/* Search */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder={t("Search orders...")}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-600 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-md overflow-x-auto shadow">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader className="animate-spin text-indigo-600" size={24} />
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Order ID")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Customer ")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Total")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Status")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Date")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t("Actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">{order.customer._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">${order.price?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(order.status)}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button 
                        onClick={() => handleViewDetails(order)} 
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Eye size={20} />
                      </button>
                      {order.status !== 'confirmed' && (
                        <button 
                          onClick={() => handleConfirmOrder(order._id)} 
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check size={20} />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center dark:text-white">
                    {t("No orders found")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isDetailsModalOpen && (
          <OrderDetailsModal 
            order={selectedOrder} 
            isOpen={isDetailsModalOpen} 
            onClose={closeDetailsModal} 
            onConfirm={handleConfirmOrder}
          />
        )}
      </AnimatePresence>
    </div>
  )


 

}

export default OrderManagement