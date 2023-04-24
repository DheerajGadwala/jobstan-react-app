import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createBookmark,
    deleteBookmark,
    checkBookmark
} from "./bookmarks-service";

export const createBookmarkThunk = createAsyncThunk(
    'createBookmark',
    async (bookmark) => await createBookmark(bookmark)
)

export const deleteBookmarkThunk = createAsyncThunk(
    'deleteBookmark',
    async (bookmark_id) => await deleteBookmark(bookmark_id)
)

export const checkBookmarkThunk = createAsyncThunk(
    'checkBookmark',
    async (id) => await checkBookmark(id)
)