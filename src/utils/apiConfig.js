// API Configuration
export const API_CONFIG = {
  // Backend API base URL - değiştirilebilir
  // Development'ta Vite proxy kullanıyoruz, production'da tam URL gerekebilir
  BASE_URL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '' : 'http://localhost:3000'),
  
  // API endpoints
  ENDPOINTS: {
    CATALOG_BRANCH: (branchId) => `/catalog/catalog/branch/${branchId}`,
  },
};

// Default branch ID (şimdilik sabit)
export const DEFAULT_BRANCH_ID = '696d35383ce2a4ecef8a1868';
