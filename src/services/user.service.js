import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005"
});

const getProfile = () => {
  const storedToken = localStorage.getItem('authToken');
  return api.get("/api/users/profile", { headers: { Authorization: `Bearer ${storedToken}`} })
    .then(response => response.data)
    .catch(err => console.error(err));
}

const updateProfile = (userData) => {
  const storedToken = localStorage.getItem('authToken');
  return api.put("/api/users/edit-profile", userData, { headers: { Authorization: `Bearer ${storedToken}`, 'Content-Type': 'multipart/form-data' } })
    .then(response => response.data)
    .catch(err => console.error(err));
}


const userMethods = {
  getProfile,
  updateProfile
}

export default userMethods;
