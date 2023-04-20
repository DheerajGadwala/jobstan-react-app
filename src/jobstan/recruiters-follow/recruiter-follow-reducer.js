import {createSlice} from "@reduxjs/toolkit";
import {getAllRecruitersThunk} from "../services/users-thunk";

const FollowRecsSlice = createSlice({
                                        name: "allRecruiters",
                                        initialState: {
                                            followRecsArray: [],
                                        },
                                        extraReducers: {
                                            [getAllRecruitersThunk.fulfilled]: (state, action) => {
                                                state.followRecsArray = action.payload
                                            }
                                        }
                                    });

export default FollowRecsSlice.reducer;