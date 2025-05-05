import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
  } from 'recharts';
  

// Reusable stats card
function StatsCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <span className="text-lg">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-bold dark:text-white">{value}</p>
      <p className="text-xs text-gray-400 dark:text-gray-300">{subtitle}</p>
    </div>
  );
}
function getMonthLabel(month, year) {
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'short', year: '2-digit' });
  }
  

export default function Statistics() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/statistics/dashboard');
      console.log("incoming data", res.data.data);
      setDashboard(res.data.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="mt-2 px-4 py-2 bg-red-200 hover:bg-red-300 rounded">
          Retry
        </button>
      </div>
    );
  }

  const {
    clients = {},
    orders = {},
    sales = {},
    overdueOrders = {},
    lowStock = {},
  } = dashboard;

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Clients"
          value={clients?.stats?.activeCount ?? 0}
          subtitle={`${clients?.stats?.inactiveCount ?? 0} inactive`}
          icon="👥"
        />
        <StatsCard
          title="Orders Paid"
          value={orders?.stats?.paidCount ?? 0}
          subtitle={`${orders?.stats?.unpaidCount ?? 0} unpaid`}
          icon="🧾"
        />
        <StatsCard
          title="Sales (Last 30 Days)"
          value={`$${(sales?.totalAmount ?? 0).toLocaleString()}`}
          subtitle="Total sales"
          icon="💵"
        />
        <StatsCard
          title="Overdue Payments"
          value={overdueOrders?.stats?.totalOverdue ?? 0}
          subtitle={`$${(overdueOrders?.stats?.totalAmountDue ?? 0).toLocaleString()} due`}
          icon="⚠️"
        />
      </div>
      {/* Sales Chart */}
      {sales?.monthlyBreakdown && sales.monthlyBreakdown.length > 0 && (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
    <h2 className="text-lg font-semibold dark:text-white mb-2">Orders per Month</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={sales.monthlyBreakdown.map(item => ({
          name: getMonthLabel(item.month, item.year),
          orders: item.count,
        }))}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis allowDecimals={false} stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}


      {/* Low Stock Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold dark:text-white mb-2">Low Stock Products</h2>
        {lowStock?.lowStockProducts?.length > 0 ? (
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr>
                <th className="text-left py-2 px-3">Product</th>
                <th className="text-left py-2 px-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.lowStockProducts.map((product) => (
                <tr key={product._id} className="border-t dark:border-gray-700">
                  <td className="py-2 px-3">{product.name}</td>
                  <td className="py-2 px-3">{product.stockQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No low stock products.</p>
        )}
      </div>
    </div>
  );
}
