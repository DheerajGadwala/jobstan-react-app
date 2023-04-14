import {createSlice} from "@reduxjs/toolkit";
import {profileThunk, logoutThunk, pendingJobPostersThunk, pendingJobSearchersThunk, approveUserThunk} from "./users-thunk";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: [],
        pendingJobSearchers: [],
        pendingJobPosters: [],
        logoutComp: false,
        currentUser: null,
        loading: true,
        profileUser: null
    },
    extraReducers: {
        [profileThunk.pending]: (state, action) => {
            state.currentUser = null
            state.loading = true
        },
        [profileThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
        },
        [profileThunk.rejected]: (state, action) => {
            state.currentUser = null
            state.loading = false
        },
        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null;
            state.logoutComp = true;
            state.loginError = "";
        },
        [pendingJobPostersThunk.fulfilled]: (state, action) => {
            state.pendingJobPosters = action.payload;
        },
        [pendingJobSearchersThunk.fulfilled]: (state, action) => {
            state.pendingJobSearchers = action.payload;
        },
        [approveUserThunk.fulfilled]: (state, action) => {
            state.pendingJobSearchers = state.pendingJobSearchers
                .filter(t => t._id !== action.payload._id)
            state.pendingJobPosters = state.pendingJobPosters
                .filter(t => t._id !== action.payload._id)
        },
    }
})

export default usersReducer.reducer