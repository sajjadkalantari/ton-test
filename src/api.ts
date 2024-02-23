import axios from 'axios';

// Define your API base URL here
const API_BASE_URL = 'http://localhost:5120';

// Setup Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    // You can add more default settings here
});

export const setAuthToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const getAppUserData = async (journeyId: number) => {
    try {
        const response = await api.get(`/app/init/${journeyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAction = async (id: number) => {
    try {
        const response = await api.get(`actions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postUserAction = async (id: number, userAction: any) => {
    try {
        const response = await api.post(`actions/${id}`, userAction);
        return response.data;
    } catch (error) {
        throw error;
    }
};



