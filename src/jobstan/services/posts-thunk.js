import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createPost,
    getPosts,
    deletePost,
    updatePost,
    getFilteredPosts
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

<<<<<<< HEAD
export const updatePostThunk = createAsyncThunk(
    'updatePost',
    async (updatedPost) => await updatePost(updatedPost)
=======
export const getFilteredPostsThunk = createAsyncThunk(
    'getPosts',
    async ({title, company, applied, user_id}) => await getFilteredPosts({title, company, applied, user_id})
>>>>>>> sai
)
