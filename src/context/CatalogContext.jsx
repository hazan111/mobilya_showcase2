import React, { createContext, useContext, useState, useEffect } from 'react';
import { catalogService } from '../services/catalogService';

const CatalogContext = createContext();

export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch catalog data on mount
  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catalogService.getBranchCatalog();
      setCatalog(data);
    } catch (err) {
      console.error('Failed to fetch catalog:', err);
      setError(err.message || 'Katalog verileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  // Helper: Get all categories (flat list including subcategories)
  const getAllCategories = () => {
    if (!catalog?.categories) return [];
    
    const flatten = (cats) => {
      let result = [];
      cats.forEach(cat => {
        result.push(cat);
        if (cat.subcategories && cat.subcategories.length > 0) {
          result = result.concat(flatten(cat.subcategories));
        }
      });
      return result;
    };
    
    return flatten(catalog.categories);
  };

  // Helper: Get category by ID
  const getCategoryById = (categoryId) => {
    const allCategories = getAllCategories();
    return allCategories.find(cat => cat._id === categoryId);
  };

  // Helper: Get products by category ID
  const getProductsByCategoryId = (categoryId) => {
    if (!catalog?.products) return [];
    return catalog.products.filter(p => p.category === categoryId);
  };

  // Helper: Get product by ID
  const getProductById = (productId) => {
    if (!catalog?.products) return null;
    return catalog.products.find(p => p._id === productId);
  };

  // Helper: Get all products
  const getAllProducts = () => {
    return catalog?.products || [];
  };

  // Helper: Get root categories only (en başta kampanyalı varsa “Kampanyalı Ürünler” eklenir)
  const getRootCategories = () => catalog?.categories || [];

  const value = {
    catalog,
    loading,
    error,
    fetchCatalog,
    getAllCategories,
    getCategoryById,
    getProductsByCategoryId,
    getProductById,
    getAllProducts,
    getRootCategories,
  };

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
