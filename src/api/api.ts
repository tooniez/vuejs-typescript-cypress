import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;