import axios from 'axios';
const BASE_API_URL = 'http://localhost:4100';
const api = axios.create({withCredentials: true});

export const logout = async () => {
    const response = await api.post(`${BASE_API_URL}/logout`)
    return response.data
}

export const pendingJobSearchers = async () => {
    const response = await api.get(`${BASE_API_URL}/pendingJobSearchers`)
    return response.data
}

export const pendingJobPosters = async () => {
    const response = await api.get(`${BASE_API_URL}/pendingJobPosters`)
    return response.data
}

export const approveUser = async (uid) => {
    const response = await axios.post(`${BASE_API_URL}/updateUser/${uid}`);
    return response.data;
}

export const profile = async () => {
    const response = await api.post(`${BASE_API_URL}/profile`)
    return response.data
}