import axios from 'axios';
const BASE_API_URL = 'http://localhost:4100';
const api = axios.create({withCredentials: true});

export const createBookmark = async (bookmark) => {
    console.log("reached sevice func");
    console.log(bookmark);
    const response = await api.post(`${BASE_API_URL}/createBookmark`, bookmark);
    return response.data;
}

export const deleteBookmark = async (bookmark_id) => {
    const response = await axios.delete(`${BASE_API_URL}/deleteBookmark/${bookmark_id}`);
    return response.data;
}

export const getBookmarks = async (id) => {
    const response = await axios.get(`${BASE_API_URL}/getBookmarks`);
    return response.data;
}

