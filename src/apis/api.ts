import axios from 'axios';

const API_BASE_URL = 'http://3.15.43.94';
const api = axios.create({
    baseURL: API_BASE_URL,
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



