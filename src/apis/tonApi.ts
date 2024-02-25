import axios from 'axios';

const API_BASE_URL = 'https://testnet.tonapi.io';
const tonApi = axios.create({
    baseURL: API_BASE_URL,
});

export const setAuthToken = (token: string) => {
    tonApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

setAuthToken("");

export const getAccountNftItems = async (address: string, params: { limit: number }) => {
    try {
        const response = await tonApi.get(`/v2/accounts/${address}/nfts`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};




