import axios from 'axios';

//taskbot api
const API_BASE_URL = 'https://taskbot-api.roolzanime.com';
//const API_BASE_URL = 'http://localhost:5120/';
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

export const getLeaderBoard = async () => {
    try {
        const response = await api.get(`app/leader-board`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserReferrals = async () => {
    try {
        const response = await api.get(`app/referrals`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserStakingInfo = async () => {
    try {
        const response = await api.get(`app/staking-info`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const postStakingNFTs = async (data: { isStaking: boolean }) => {
    try {
        const response = await api.post(`app/stake-nfts`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postClaimStakedPoints = async () => {
    try {
        const response = await api.post(`app/claim-staked`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


