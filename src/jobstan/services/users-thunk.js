import {createAsyncThunk} from "@reduxjs/toolkit";
import {profile, logout, pendingJobSearchers, pendingJobPosters, approveUser} from "./users-service";

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const pendingJobPostersThunk = createAsyncThunk(
    'pendingJobPosters',
    async () => await pendingJobPosters()
)

export const pendingJobSearchersThunk = createAsyncThunk(
    'pendingJobSearchers',
    async () => await pendingJobSearchers()
)

export const approveUserThunk = createAsyncThunk(
    'approveUser',
    async (uid) => await approveUser(uid)
)

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await profile()
)