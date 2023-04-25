import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createBookmark,
    deleteBookmark,
    getBookmarks
} from "./bookmarks-service";

export const createBookmarkThunk = createAsyncThunk(
    'createBookmark',
    async (bookmark) => await createBookmark(bookmark)
)

export const deleteBookmarkThunk = createAsyncThunk(
    'deleteBookmark',
    async (bookmark_id) => await deleteBookmark(bookmark_id)
)

export const getBookmarksThunk = createAsyncThunk(
    'getBookmarks',
    async () => await getBookmarks()
)