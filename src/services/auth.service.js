import axios from "axios";
 
const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005",
  withCredentials: true
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const signUp = ({ username, password, email }) => {
    return api.post("/auth/signup", {username, password, email})
                   .then(response => response.data)
                   .catch(err => console.error(err))
}

const logIn = ({username, password}) => {
    return api.post("/auth/login", {username, password})
                .then(response => {
                    console.log('Response Data:', response.data);
                    return response.data;
                })
                .catch(err => console.error(err))
}

const verifyToken = (storedToken) => {
    return api.get("/auth/verify", { headers: { Authorization: `Bearer ${storedToken}`} })
              .then(response => response.data)
              .catch(err => console.error(err))
}

const uploadPhoto = (uploadData) => {
    return api.post("/api/upload", uploadData)
                .then(response => response.data)
                .catch(err => console.error(err))
}

const getCurrentUser = () => {
    const storedToken = localStorage.getItem('authToken')
    return api.get("/api/users", { headers: { Authorization: `Bearer ${storedToken}`} })
    .then(response => response.data)
    .catch(err => console.error(err))
}

const editUser = (formData) => {
    const storedToken = localStorage.getItem('authToken')
    return api.put("/api/users/edit-profile", formData, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(response => response.data)
        .catch(err => console.error(err));
};


const authMethods = {
    signUp,
    logIn,
    verifyToken,
    uploadPhoto,
    getCurrentUser,
    editUser
}

export default authMethods;