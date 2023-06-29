import axios from 'axios';
require("dotenv").config();

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
    withCredentials: true
});

export default instance;
