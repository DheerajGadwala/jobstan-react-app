import {createSlice} from "@reduxjs/toolkit";
import {
    createBookmarkThunk,
    deleteBookmarkThunk,
    getBookmarksThunk
} from "./bookmarks-thunk";

const bookmarksReducer = createSlice({
                                     name: 'bookmarks',
                                     initialState: {
                                         bookmarks: [],
                                         loading: true,
                                     },
                                     reducers: {
                                         clearBookmarks: (state) => {state.bookmarks = []}
                                     },
                                     extraReducers: {
                                         [createBookmarkThunk.fulfilled]: (state, action) => {
                                             state.bookmarks.push(action.payload);
                                         },
                                         [deleteBookmarkThunk.fulfilled]: (state, action) => {
                                             state.loading = false;
                                             state.bookmarks = state.bookmarks
                                                 .filter(bookmark => bookmark._id !== action.payload);
                                         },
                                         [getBookmarksThunk.fulfilled]: (state, action) => {
                                             state.bookmarks = action.payload;
                                         },
                                     }
                                 })
export const { clearBookmarks } = bookmarksReducer.actions;
export default bookmarksReducer.reducer