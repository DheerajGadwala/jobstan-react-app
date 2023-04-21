import {createSlice} from "@reduxjs/toolkit";
import {
    createPostThunk, getPostsThunk, deletePostThunk,
} from "./posts-thunk";

const postsReducer = createSlice({
                                     name: 'posts',
                                     initialState: {
                                        posts: [],
                                        loading: true
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
                                         [deletePostThunk.fulfilled]: (state, action) => {
                                             state.loading = false;
                                             state.posts = state.posts
                                                 .filter(post => post._id !== action.payload);
                                             },
                                         },
                                 })

export default postsReducer.reducer;