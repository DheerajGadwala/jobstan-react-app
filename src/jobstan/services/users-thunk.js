import {createAsyncThunk} from "@reduxjs/toolkit";
import {profile, logout, pendingJobSearchers, pendingJobPosters, approveUser, login, register} from "./users-service";

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const pendingRecruitersThunk = createAsyncThunk(
    'pendingRecruiters',
    async () => await pendingRecruiters()
)

export const pendingApplicantsThunk = createAsyncThunk(
    'pendingApplicants',
    async () => await pendingApplicants()
)

export const approveUserThunk = createAsyncThunk(
    'approveUser',
    async (uid) => await approveUser(uid)
)

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await profile()
)

export const loginThunk = createAsyncThunk(
    'login',
    async (user) => await login(user)
)

export const registerThunk = createAsyncThunk(
    'register',
    async (user) => await register(user)
)