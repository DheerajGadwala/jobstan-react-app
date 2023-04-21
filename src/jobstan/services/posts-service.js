import axios from 'axios';
const BASE_API_URL = 'http://localhost:4100';
const api = axios.create({withCredentials: true});

export const createPost = async (post) => {
    const response = await api.post(`${BASE_API_URL}/createPost`, post);
    return response.data;
}

export const getPosts = async (user_id) => {
    const response = await axios.get(`${BASE_API_URL}/getPosts/${user_id}`);
    return response.data;
}

export const deletePost = async (post_id) => {
    const response = await axios.delete(`${BASE_API_URL}/deletePost/${post_id}`);
    return response.data;
}
