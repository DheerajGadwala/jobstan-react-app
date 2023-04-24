import {createSlice} from "@reduxjs/toolkit";
import {
    createBookmarkThunk,
    deleteBookmarkThunk,
    checkBookmarkThunk
    
} from "./bookmarks-thunk";

const bookmarksReducer = createSlice({
                                     name: 'bookmarks',
                                     initialState: {
                                         bookmarks: [],
                                         bookmarked: false,
                                         loading: true,
                                         currentBookmark: null
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
                                         [checkBookmarkThunk.fulfilled]: (state, action) => {
                                             state.bookmarked = true;
                                             state.currentBookmark = action.payload.bookmark;
                                         },
                                         [checkBookmarkThunk.rejected]: (state, action) => {
                                             state.bookmarked = false;
                                             state.currentBookmark = null;
                                         },
                                     }
                                 })
export const { clearBookmarks } = bookmarksReducer.actions;
export default bookmarksReducer.reducer