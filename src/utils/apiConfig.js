// API Configuration
export const API_CONFIG = {
  // Backend API base URL - değiştirilebilir
  // Development ve production'da production domain kullanılıyor
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://epanelapi.wmbyazilim.com',
  
  // API endpoints
  ENDPOINTS: {
    CATALOG_BRANCH: (branchId) => `/catalog/catalog/branch/${branchId}`,
    COMPANY_CONTACT_INFO: (companyId) => `/catalog/catalog/company/${companyId}/contact-info`,
  },
};

// Default branch ID (katalog için)
export const DEFAULT_BRANCH_ID = '696d35383ce2a4ecef8a1868';

// Şirket iletişim bilgisi için company ID
export const DEFAULT_COMPANY_ID = '696d35193ce2a4ecef8a1856';
