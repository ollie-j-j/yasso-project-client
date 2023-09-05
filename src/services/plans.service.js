import axios from 'axios';

const API_URL = 'http://localhost:5005';

const addPlan = (trainingPlan, token) => {
  return axios.post(`${API_URL}/api/training/original/add-plan`, trainingPlan, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const updatePlan = (planId, updatedPlan, token) => {
  return axios.put(`${API_URL}/api/training/original/update-plan/${planId}`, updatedPlan, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const getCurrentPlan = (token) => {
  return axios.get(`${API_URL}/api/training/original/current-plan`, {
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });
};

const deletePlan = (userId, token) => {
  return axios.delete(`${API_URL}/api/training/original/delete-plan/${userId}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
      },
  });
};

const planMethods = {
    addPlan,
    updatePlan,
    getCurrentPlan,
    deletePlan,
};

export default planMethods;
