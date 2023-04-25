import {createSlice} from "@reduxjs/toolkit";
import {
    createPostThunk, getPostsThunk, deletePostThunk, updatePostThunk, getFilteredPostsThunk, getAllPostsThunk
} from "./posts-thunk";

const postsReducer = createSlice({
                                     name: 'posts',
                                     initialState: {
                                        posts: [],
                                        loading: true
                                     },
                                     reducers: {
                                        clearPosts: (state) => {state.posts = []}
                                     },
                                     extraReducers: {
                                         [createPostThunk.fulfilled]: (state, action) => {
                                             state.posts.push(action.payload);
                                             }, 
                                         [getPostsThunk.pending]: (state, action) => {
                                             state.loading = true;
                                             }, 
                                         [getPostsThunk.fulfilled]: (state, action) => {
                                             state.posts = action.payload;
                                             state.loading = false;
                                             },
                                         [getAllPostsThunk.fulfilled]: (state, action) => {
                                             state.posts = action.payload;
                                             state.loading = false;
                                         },
                                         [getFilteredPostsThunk.pending]: (state, action) => {
                                             state.loading = true;
                                         },
                                         [getFilteredPostsThunk.fulfilled]: (state, action) => {
                                             state.posts = action.payload;
                                             state.loading = false
                                         },
                                         [deletePostThunk.fulfilled]: (state, action) => {
                                             state.loading = false;
                                             state.posts = state.posts
                                                 .filter(post => post._id !== action.payload);
                                             },
                                         [updatePostThunk.fulfilled]: (state, action) => {
                                                 state.loading = false
                                                 const postIndex = state.posts
                                                     .findIndex((post) => post._id === action.payload._id)
                                                 state.posts[postIndex] = {
                                                     ...state.posts[postIndex],
                                                     ...action.payload
                                                 }
                                             },
                                         },
                                 })
export const { clearPosts } = postsReducer.actions;
export default postsReducer.reducer;