import axios from 'axios';
const BASE_API_URL = 'http://localhost:4100';
const api = axios.create({withCredentials: true});

export const logout = async () => {
    console.log("reached logout service")
    const response = await api.post(`${BASE_API_URL}/logout`)
    return response.data
}

export const pendingRecruiters = async () => {
    const response = await api.get(`${BASE_API_URL}/pendingRecruiters`)
    return response.data
}

export const pendingApplicants = async () => {
    const response = await api.get(`${BASE_API_URL}/pendingApplicants`)
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

export const login = async (user) => {
    const response = await api.post(`${BASE_API_URL}/login`, user)
    return response.data
}

export const register = async (user) => {
    const response = await api.post(`${BASE_API_URL}/register`, user)
    const newUser = response.data
    return newUser
}

export const updateProfile = async (profile) => {
    const response = await axios.put(`${BASE_API_URL}/updateProfile/${profile._id}`, profile);
    return response.data;
}

export const getRecruiters = async (uid) => {
    const response = await axios.get(`${BASE_API_URL}/getRecruiters/${uid}`);
    return response.data;
}

export const getUser = async (uid) => {
    console.log("reached getuser service");
    const response = await axios.get(`${BASE_API_URL}/getUser/${uid}`);
    return response.data;
}

export const getFilteredApplicants = async (data) => {
    const response = await axios.get(`${BASE_API_URL}/getFilteredApplicants/${data.major}/${data.university}`);
    return response.data;
}