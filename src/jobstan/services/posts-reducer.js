import {createSlice} from "@reduxjs/toolkit";
import {
    createPostThunk, getPreviousPostsThunk
} from "./posts-thunk";

const postsReducer = createSlice({
                                     name: 'posts',
                                     initialState: {
                                        posts: [],
                                        loading: true
                                     },
                                     extraReducers: {
                                        [createPostThunk.fulfilled]: (state, action) => {
                                            state.homePosts.push(action.payload);
                                            // console.log(action.payload);
                                        },
                                        [getPreviousPostsThunk.pending]: (state, action) => {
                                            state.loading = true;
                                        },
                                        [getPreviousPostsThunk.fulfilled]: (state, action) => {
                                            // console.log(...action.payload);
                                            state.posts = [...state.posts, ...action.payload];
                                            state.loading = false;
                                        }
                                     }
                                 })

export default postsReducer.reducer;