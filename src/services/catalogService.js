import { API_CONFIG, DEFAULT_BRANCH_ID } from '../utils/apiConfig';

/**
 * Catalog Service
 * API'den katalog verilerini çeker
 */
export const catalogService = {
  /**
   * Şube katalog verilerini getir
   * @param {string} branchId - Şube ID (opsiyonel, default kullanılır)
   * @returns {Promise} Katalog verisi
   */
  async getBranchCatalog(branchId = DEFAULT_BRANCH_ID) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATALOG_BRANCH(branchId)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Catalog API Error:', error);
      throw error;
    }
  },
};
