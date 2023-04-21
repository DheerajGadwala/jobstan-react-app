import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createPost,
    getPosts,
    deletePost,
    updatePost,
} from "./posts-service";

export const createPostThunk = createAsyncThunk(
    'createPost',
    async (post) => await createPost(post)
)

export const getPostsThunk = createAsyncThunk(
    'getPosts',
    async (user_id) => await getPosts(user_id)
)

export const deletePostThunk = createAsyncThunk(
    'deletePost',
    async (post_id) => await deletePost(post_id)
)

export const updatePostThunk = createAsyncThunk(
    'updatePost',
    async (updatedPost) => await updatePost(updatedPost)
)
