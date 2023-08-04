import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchPhotos = createAsyncThunk(
    "photos/fetchPhotos",
    async () => {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/photos");
        return data;
    }
);

const initialState = {
    startPhotosCount: 0,
    endPhotosCount: 3,
    items: [],
    showItems: [],
    statusApi: "",
    currentPhoto: {},
    isShowPhotoInfo: false,
    isShowPhotoAdd: false,
    isShowPhotoEdit: false,
    isShowPhotoDelete: false,
    modalTitle: "",
}

export const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        showStartPhotos: (state) => {
            state.showItems = state.items.slice(state.startPhotosCount, state.endPhotosCount);
        },
        showNextPhotos: (state) => {
            state.startPhotosCount += 3;
            state.endPhotosCount += 3;
            const addItems = state.items.slice(state.startPhotosCount, state.endPhotosCount);
            state.showItems = state.showItems.concat(addItems);
        },
        openModalPhotoInfo: (state, action) => {
            state.currentPhoto = state.showItems.find(item => item.id === action.payload);
            state.isShowPhotoInfo = true;
            state.modalTitle = "Info photo";
        },
        openModalPhotoAdd: (state) => {
            state.isShowPhotoAdd = true;
            state.modalTitle = "Create new photo";
        },
        addPhoto: (state, action) => {
            if (action.payload.title === "" || action.payload.body === "") {
                alert("Photo didn't create! Please fill in all fields! ");
            } else {
                state.showItems.push(action.payload);
                state.isShowPhotoAdd = false;
            }
        },
        openModalPhotoEdit: (state, action) => {
            state.currentPhoto = state.showItems.find(item => item.id === action.payload);
            state.isShowPhotoEdit = true;
            state.modalTitle = "Edit photo";
        },
        updatePhoto: (state, action) => {
            state.currentPhoto = state.showItems.find(item => item.id === action.payload.id);
            state.currentPhoto.title = action.payload.title;
            state.currentPhoto.url = action.payload.url;
            state.isShowPhotoEdit = false;
        },
        openModalPhotoDelete: (state, action) => {
            state.currentPhoto = state.showItems.find(item => item.id === action.payload);
            state.isShowPhotoDelete = true;
            state.modalTitle = "Delete photo";
        },
        deletePhoto: (state, action) => {
            state.currentPhoto = state.showItems.find(item => item.id === action.payload);
            state.showItems = state.showItems.filter(item => item.id !== action.payload);
            state.isShowPhotoDelete = false;
        },
        closeModalPhoto: (state) => {
            state.isShowPhotoInfo = false;
            state.isShowPhotoAdd = false;
            state.isShowPhotoEdit = false;
            state.isShowPhotoDelete = false;
        }
    },
    extraReducers: {
        [fetchPhotos.pending]: (state) => {
            state.statusApi = "loading";
        },
        [fetchPhotos.fulfilled]: (state, action) => {
            state.statusApi = "success";
            state.items = action.payload;
        },
        [fetchPhotos.rejected]: (state) => {
            state.statusApi = "error";
        },
    }
});

export const {
    showStartPhotos,
    showNextPhotos,
    openModalPhotoInfo,
    openModalPhotoAdd,
    addPhoto,
    openModalPhotoEdit,
    updatePhoto,
    openModalPhotoDelete,
    deletePhoto,
    closeModalPhoto
} = photosSlice.actions;

export default photosSlice.reducer;