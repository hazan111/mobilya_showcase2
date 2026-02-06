import { API_CONFIG, DEFAULT_BRANCH_ID, DEFAULT_COMPANY_ID } from '../utils/apiConfig';

/**
 * Catalog Service
 * API'den katalog ve şirket iletişim verilerini çeker
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
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Catalog API Error:', error);
      throw error;
    }
  },

  /**
   * Şirket iletişim bilgisi ve şubeleri getir (public, auth yok)
   * @param {string} companyId - Şirket ID (opsiyonel, default kullanılır)
   * @returns {Promise<{ company: { name, address, locationlink, email, phone }, branches: Array }>}
   */
  async getCompanyContactInfo(companyId = DEFAULT_COMPANY_ID) {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_CONTACT_INFO(companyId)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Company contact API Error:', error);
      throw error;
    }
  },
};
