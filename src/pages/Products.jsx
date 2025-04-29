import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Grid, List, ChevronDown, AlertCircle, ShoppingCart } from "lucide-react";
import SpinnerIcon from "../components/SpinnerIcon";
import axiosInstance from "../config/axios";
import ProductForm from "../components/ProductForm";
import staticImg from "../assets/img/security-illustration.svg";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = staticImg;

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [lowStockFilter, setLowStockFilter] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("http://localhost:3000/products");
        const responseData = response.data;
        
        if (Array.isArray(responseData.data)) {
          setProducts(responseData.data);
        } else if (Array.isArray(responseData)) {
          setProducts(responseData);
        } else {
          console.error("Unexpected API response format:", responseData);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Handle checkout
  const handleCheckout = async (product) => {
    try {
      setIsLoading(true);
      console.log("Checkout productId:", product._id);
      if (typeof product._id !== "string" || product._id.length !== 24) {
        console.error("Invalid productId:", product._id);
        return;
      }
      
      const response = await axiosInstance.post("http://localhost:3000/payments/checkout", {
        customerId: '661deac80c1b898c6b177c2b',
        items: [{ productId: String(product._id), quantity: 1 }],
        price: 100,
        urlSuccess: 'http://localhost:5173/success',
        urlCancel: 'http://localhost:5173/cancel',
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on search, category, and stock
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        (product.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === "" || product.category === categoryFilter;
      
      const matchesLowStock = 
        !lowStockFilter || (product.stockQuantity <= (product.lowStockThreshold || 5));
      
      return matchesSearch && matchesCategory && matchesLowStock;
    });
  }, [searchTerm, categoryFilter, products, lowStockFilter]);

  // Get unique categories
  const uniqueCategories = useMemo(() => {
    const categories = products
      .map((product) => product.category)
      .filter(Boolean);
    return [...new Set(categories)];
  }, [products]);

  // Product CRUD operations
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm(t("Are you sure you want to delete this product?"))) {
      try {
        await axiosInstance.delete(`/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleFormSubmit = async (productData) => {
    try {
      let response;
      if (editingProduct) {
        response = await axiosInstance.put(
          `/products/${editingProduct._id}`,
          productData
        );
        setProducts(products.map(p => 
          p._id === editingProduct._id ? response.data.data : p
        ));
      } else {
        response = await axiosInstance.post("/products", productData);
        setProducts([...products, response.data.data]);
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <HeroSection t={t} />
      
      <Productsection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        uniqueCategories={uniqueCategories}
        filteredProducts={filteredProducts}
        viewMode={viewMode}
        setViewMode={setViewMode}
        visibleProducts={visibleProducts}
        setVisibleProducts={setVisibleProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onCheckout={handleCheckout}
        lowStockFilter={lowStockFilter}
        setLowStockFilter={setLowStockFilter}
        t={t}
      />
      
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
          t={t}
        />
      )}
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ t }) => {
  return (
    <section className="py-10 md:py-20 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
              {t("Product Management")}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-justify text-gray-500 dark:text-gray-300 md:mt-5 md:max-w-2xl">
              {t(
                "Manage your product inventory efficiently. Track stock levels, prices, and categories to keep your business running smoothly."
              )}
            </p>
          </div>
          <div className="mt-12 relative sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <img
              src={DEFAULT_IMAGE}
              alt="product illustration"
              className="w-full h-[18rem] lg:h-[18rem] lg:max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Section Component
const Productsection = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  uniqueCategories,
  filteredProducts,
  viewMode,
  setViewMode,
  visibleProducts,
  setVisibleProducts,
  isLoading,
  setIsLoading,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onCheckout,
  lowStockFilter,
  setLowStockFilter,
  t
}) => {
  const handleViewMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 8);
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading, setVisibleProducts]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("Product List")}
          </h2>
          <button
            onClick={onAddProduct}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
          >
            {t("Add Product")}
          </button>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          uniqueCategories={uniqueCategories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          lowStockFilter={lowStockFilter}
          setLowStockFilter={setLowStockFilter}
          t={t}
        />

        <ProductList
          products={filteredProducts.slice(0, visibleProducts)}
          viewMode={viewMode}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
          onCheckout={onCheckout}
          t={t}
        />

        {visibleProducts < filteredProducts.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleViewMore}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-5 h-5 mr-2" />
                  {t("Loading...")}
                </>
              ) : (
                t("View More")
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Search and Filter Component
const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  uniqueCategories,
  viewMode,
  setViewMode,
  lowStockFilter,
  setLowStockFilter,
  t
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category) => {
    setCategoryFilter(category);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mb-6">
      <div className="relative mb-4 md:mb-0 md:w-3/4">
        <div className="flex">
          <button
            id="dropdown-button"
            className="flex-shrink-0 inline-flex items-center rounded-l-md py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-md hover:bg-gray-200 focus:ring-2 focus:ring-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {categoryFilter === "" ? t("All Categories") : t(categoryFilter)}
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700">
              <ul className="scroll py-2 text-sm text-slate-700 dark:text-slate-200 max-h-60 overflow-y-auto">
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleFilterChange("")}
                  >
                    {t("All Categories")}
                  </button>
                </li>
                {uniqueCategories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleFilterChange(category)}
                    >
                      {t(category)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="search"
              className="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-e-md border-s-gray-50 border-s-2 border-l-0 border border-slate-300 focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none"
              placeholder={t("Search products...")}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-md ${viewMode === "grid" ? "bg-primary text-white" : "bg-gray-200 dark:bg-slate-700"}`}
        >
          <Grid size={24} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-md ${viewMode === "list" ? "bg-primary text-white" : "bg-gray-200 dark:bg-slate-700"}`}
        >
          <List size={24} />
        </button>
        <label className="flex items-center space-x-2 ml-4 cursor-pointer">
          <input
            type="checkbox"
            checked={lowStockFilter}
            onChange={() => setLowStockFilter(!lowStockFilter)}
            className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {t("Low Stock")}
          </span>
        </label>
      </div>
    </div>
  );
};

// Product List Component
const ProductList = ({ products, viewMode, onEdit, onDelete, onCheckout, t }) => {
  const [imgError, setImgError] = useState(false);

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">{t("No products found.")}</p>
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" 
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
      : "grid grid-cols-1 gap-6"
    }>
      {products.map((product) => (
        viewMode === "grid" ? (
          <ProductCard
            key={product._id || product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckout={onCheckout}
            imgError={imgError}
            setImgError={setImgError}
            t={t}
          />
        ) : (
          <ProductListItem
            key={product._id || product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onCheckout={onCheckout}
            imgError={imgError}
            setImgError={setImgError}
            t={t}
          />
        )
      ))}
    </div>
  );
};

// Product Card Component (Grid View)
const ProductCard = ({ product, onEdit, onDelete, onCheckout, imgError, setImgError, t }) => {
  const isLowStock = product.stockQuantity <= (product.lowStockThreshold || 5);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition duration-300 hover:shadow-md">
      <div className="relative">
        <img
          src={imgError ? DEFAULT_IMAGE : (product.image || DEFAULT_IMAGE)}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={() => setImgError(true)}
        />
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {t("Low Stock")}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold dark:text-white truncate">
            {product.name}
          </h3>
          <span className="text-primary font-bold dark:text-primary-light">
            {product.price?.toFixed(2) || product.unitPrice?.toFixed(2)} {t("MAD")}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium dark:text-gray-300">
            {t("Stock")}: {product.stockQuantity}
          </span>
          {product.category && (
            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
              {product.category}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onCheckout(product)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center"
          >
            <ShoppingCart size={16} className="mr-2" />
            {t("Buy Now")}
          </button>
        </div>
      </div>
    </div>
  );
};

// Product List Item Component (List View)
const ProductListItem = ({ product, onEdit, onDelete, onCheckout, imgError, setImgError, t }) => {
  const isLowStock = product.stockQuantity <= (product.lowStockThreshold || 5);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 relative">
          <img
            src={imgError ? DEFAULT_IMAGE : (product.image || DEFAULT_IMAGE)}
            alt={product.name}
            className="w-full h-48 sm:h-full object-cover"
            onError={() => setImgError(true)}
          />
          {isLowStock && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {t("Low Stock")}
            </div>
          )}
        </div>
        <div className="sm:w-3/4 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold dark:text-white">
              {product.name}
            </h3>
            <span className="text-primary font-bold dark:text-primary-light text-lg">
              {product.price?.toFixed(2) || product.unitPrice?.toFixed(2)} {t("MAD")}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {product.description}
          </p>
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium dark:text-gray-300">
                <span className="font-bold">{t("Stock")}:</span> {product.stockQuantity}
              </span>
              {product.category && (
                <span className="text-sm font-medium dark:text-gray-300">
                  <span className="font-bold">{t("Category")}:</span> {product.category}
                </span>
              )}
              {product.sku && (
                <span className="text-sm font-medium dark:text-gray-300">
                  <span className="font-bold">{t("SKU")}:</span> {product.sku}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onCheckout(product)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center"
            >
              <ShoppingCart size={16} className="mr-2" />
              {t("Buy Now")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;