import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createPost,
    getPreviousPosts
} from "./posts-service";

export const createPostThunk = createAsyncThunk(
    'createPost',
    async (post) => await createPost(post)
)

export const getPreviousPostsThunk = createAsyncThunk(
    'previousPosts',
    async (recruiter_id) => await getPreviousPosts(recruiter_id)
)