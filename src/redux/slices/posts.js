import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
        return data;
    }
);

const initialState = {
    startPostsCount: 0,
    endPostsCount: 3,
    items: [],
    showItems: [],
    statusApi: "",
    currentPost: {},
    isShowPostInfo: false,
    isShowPostAdd: false,
    isShowPostEdit: false,
    isShowPostDelete: false,
    modalTitle: "",
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        showStartPosts: (state) => {
            state.showItems = state.items.slice(state.startPostsCount, state.endPostsCount);
        },
        showNextPosts: (state) => {
            state.startPostsCount += 3;
            state.endPostsCount += 3;
            const addItems = state.items.slice(state.startPostsCount, state.endPostsCount);
            state.showItems = state.showItems.concat(addItems);
        },
        openModalPostInfo: (state, action) => {
            state.currentPost = state.showItems.find(item => item.id === action.payload);
            state.isShowPostInfo = true;
            state.modalTitle = "Info post";
        },
        openModalPostAdd: (state) => {
            state.isShowPostAdd = true;
            state.modalTitle = "Create new post";
        },
        addPost: (state, action) => {
            if (action.payload.title === "" || action.payload.body === "") {
                alert("Post didn't create! Please fill in all fields! ");
            } else {
                state.showItems.push(action.payload);
                state.isShowPostAdd = false;
            }
        },
        openModalPostEdit: (state, action) => {
            state.currentPost = state.showItems.find(item => item.id === action.payload);
            state.isShowPostEdit = true;
            state.modalTitle = "Edit post";
        },
        updatePost: (state, action) => {
            state.currentPost = state.showItems.find(item => item.id === action.payload.id);
            state.currentPost.title = action.payload.title;
            state.currentPost.body = action.payload.body;
            state.isShowPostEdit = false;
        },
        openModalPostDelete: (state, action) => {
            state.currentPost = state.showItems.find(item => item.id === action.payload);
            state.isShowPostDelete = true;
            state.modalTitle = "Delete post";
        },
        deletePost: (state, action) => {
            state.currentPost = state.showItems.find(item => item.id === action.payload);
            state.showItems = state.showItems.filter(item => item.id !== action.payload);
            state.isShowPostDelete = false;
        },
        closeModalPost: (state) => {
            state.isShowPostInfo = false;
            state.isShowPostAdd = false;
            state.isShowPostEdit = false;
            state.isShowPostDelete = false;
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.statusApi = "loading";
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.statusApi = "success";
            state.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.statusApi = "error";
        },
    }
});

export const {
    showStartPosts,
    showNextPosts,
    openModalPostInfo,
    openModalPostAdd,
    addPost,
    openModalPostEdit,
    updatePost,
    openModalPostDelete,
    deletePost,
    closeModalPost
} = postsSlice.actions;

export default postsSlice.reducer;