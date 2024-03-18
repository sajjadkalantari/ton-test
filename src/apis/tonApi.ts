import axios from 'axios';

const API_BASE_URL = 'https://tonapi.io';
const tonApi = axios.create({
    baseURL: API_BASE_URL,
});

export const setAuthToken = (token: string) => {
    tonApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

setAuthToken("AF2DOQJUIUWXNVYAAAAJBURCD5LU6MKLKM7F4IGUNAA32LST26SY7FOTKOG6W7PUAZWH5BA");

export const getAccountNftItems = async (address: string, params: { limit: number, collection: string}) => {
    try {
        const response = await tonApi.get(`/v2/accounts/${address}/nfts`, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};




