import {createSlice} from "@reduxjs/toolkit";
import {
    profileThunk,
    logoutThunk,
    pendingRecruitersThunk,
    updateProfileThunk,
    pendingApplicantsThunk,
    approveUserThunk,
    loginThunk,
    registerThunk,
    getAllRecruitersThunk,
    removeFollowedRecruiter,
    getUserThunk,
    getFilteredApplicantsThunk
} from "./users-thunk";

const usersReducer = createSlice({
                                     name: 'users',
                                     initialState: {
                                         users: [],
                                         pendingApplicants: [],
                                         pendingRecruiters: [],
                                         allRecruiters: [],
                                         logoutComp: false,
                                         currentUser: null,
                                         loading: true,
                                         profileUser: null,
                                         clickedUser: null,
                                         searchLoading: true
                                     },
                                     reducers: {
                                        clearUsers: (state) => {state.users = []}
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
                                         [registerThunk.fulfilled]: (state, action) => {
                                             state.registerError = "";
                                             state.registerSuccess = true;
                                         },
                                         [registerThunk.rejected]: (state, action) => {
                                             state.registerError =
                                                 "Registration failed, either given username exists or you are yet to fill in all the details";
                                         },
                                         [logoutThunk.fulfilled]: (state, action) => {
                                             state.currentUser = null;
                                             state.logoutComp = true;
                                             state.loginError = "";
                                         },
                                         [loginThunk.fulfilled]: (state, action) => {
                                             state.currentUser = action.payload
                                             state.registerSuccess = false;
                                             state.logoutComp = false;
                                         },
                                         [loginThunk.rejected]: (state, action) => {
                                             state.loginError =
                                                 "Ensure your credentials are valid, or wait for Admin Approval";
                                         },
                                         [pendingRecruitersThunk.fulfilled]: (state, action) => {
                                             state.pendingRecruiters = action.payload;
                                         },
                                         [pendingApplicantsThunk.fulfilled]: (state, action) => {
                                             state.pendingApplicants = action.payload;
                                         },
                                         [getAllRecruitersThunk.fulfilled]: (state, action) => {
                                             state.allRecruiters = action.payload;
                                         },
                                         [approveUserThunk.fulfilled]: (state, action) => {
                                             state.pendingApplicants = state.pendingApplicants
                                                 .filter(t => t._id !== action.payload._id)
                                             state.pendingRecruiters = state.pendingRecruiters
                                                 .filter(t => t._id !== action.payload._id)
                                         },
                                         [updateProfileThunk.fulfilled]: (state, action) => {
                                             state.currentUser = action.payload;
                                             state.allRecruiters =
                                                 state.allRecruiters.filter(
                                                     followRec => followRec._id
                                                                  !== action.payload.appFollowing[action.payload.appFollowing.length
                                                                                                  - 1]);
                                         },
                                         [getUserThunk.fulfilled]: (state, action) => {
                                             state.clickedUser = action.payload;
                                         },
                                         [getFilteredApplicantsThunk.pending]: (state, action) => {
                                            state.searchLoading = true;
                                         },
                                         [getFilteredApplicantsThunk.fulfilled]: (state, action) => {
                                            state.users = action.payload;
                                            state.searchLoading = false;
                                         }
                                     }
                                 })
export const { clearUsers } = usersReducer.actions;
export default usersReducer.reducer