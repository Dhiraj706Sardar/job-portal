import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        bookmarks:[]
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
            if (!action.payload) {
                state.bookmarks = [];
            }
        },
        setBookmarks:(state, action) => {
            state.bookmarks = action.payload || [];
        },
        toggleBookmarkJob:(state, action) => {
            const job = action.payload;
            if (!job) return;
            const jobId = job._id || job;
            const exists = state.bookmarks.some(b => (b?._id || b) === jobId);
            if (exists) {
                state.bookmarks = state.bookmarks.filter(b => (b?._id || b) !== jobId);
            } else {
                state.bookmarks.push(job);
            }
        }
    }
});
export const {setLoading, setUser, setBookmarks, toggleBookmarkJob} = authSlice.actions;
export default authSlice.reducer;