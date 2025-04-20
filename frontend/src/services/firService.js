import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const firService = {
  // Create new FIR
  createFIR: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/api/fir_application`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create FIR' };
    }
  },

  // Get all FIRs
  getAllFIRs: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/fir_application`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch FIRs' };
    }
  },

  // Get FIR by ID
  getFIRById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/fir_application/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch FIR details' };
    }
  },

  // Update FIR status
  updateFIRStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${API_URL}/api/fir_application/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update FIR status' };
    }
  }
}; 