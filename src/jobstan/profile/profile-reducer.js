import { createSlice } from "@reduxjs/toolkit";
import profile from "./profile.json"

const profileSlice = createSlice({
                                     name: "profile",
                                     initialState: profile,
                                 });

export default profileSlice.reducer;