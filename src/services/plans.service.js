import axios from 'axios';

const API_URL = 'http://localhost:5005';

const addPlan = (trainingPlan, token) => {
  return axios.post(`${API_URL}/api/training/original/add-plan`, trainingPlan, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

const planMethods = {
    addPlan,
};

export default planMethods;
