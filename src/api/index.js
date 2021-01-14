import axios from 'axios';

const BASE_URL = 'https://polar-river-87898.herokuapp.com/api';


const axiosClient = axios.create({
    baseURL: BASE_URL
});

axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosClient;