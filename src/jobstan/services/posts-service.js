import axios from 'axios';
const BASE_API_URL = 'http://localhost:4100';
const api = axios.create({withCredentials: true});

export const createPost = async (post) => {
    const response = await api.post(`${BASE_API_URL}/createPost`, post);
    return response.data;
}

export const getPreviousPosts = async (recruiter_id) => {
    const response = await axios.get(`${BASE_API_URL}/previousPosts/${recruiter_id}`);
    return response.data;
}