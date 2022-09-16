import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook"

const initialState = {
   photosList: [],
   photosLoadingStatus: 'idle',
   favorites: [],
   filterFavorites: [],
   term: "",
   filterPhotosList: []
}

export const getAllPhotos = createAsyncThunk(
   "photos/getAllPhotos",
   () => {
      const {request} = useHttp()
      return request(`https://jsonplaceholder.typicode.com/photos`)
   }
)
const photosSlice = createSlice({
   name: "photos",
   initialState,
   reducers: {
      filtersFetched: (state, action) => {
               state.term = action.payload
            },
      filterABC: state => {
         state.photosList = state.photosList.sort((a, b) => a.title > b.title ? 1 : -1);
         state.favorites = state.favorites.sort((a, b) => a.title > b.title ? 1 : -1)
      },
      filterAlbum: state => {
         state.photosList = state.photosList.sort((a, b) => a.albumId > b.albumId ? 1 : -1);
         state.favorites = state.favorites.sort((a, b) => a.albumId > b.albumId ? 1 : -1);
      },
      activeFilterChanged: (state, action) => {
               state.filterPhotosList = state.photosList.filter(item => item.title.startsWith(state.term));
               state.filterFavorites = state.favorites.filter(item => item.title.startsWith(state.term))
            },
      favoritesFetched: (state, action) => {
               state.favorites = action.payload
            },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllPhotos.pending, state => {state.photosLoadingStatus = 'loading'})
         .addCase(getAllPhotos.fulfilled, (state, action) => {
               state.photosLoadingStatus = 'idle';
               state.photosList = action.payload
            })
         .addCase(getAllPhotos.rejected, state => {state.photosLoadingStatus = 'error'})
         .addDefaultCase(() => {})
   }
})

const {actions, reducer} = photosSlice

export default reducer;
export const {
   photosFetching,
   photosFetched,
   photosFetchingError,
   filtersFetched,
   filterABC,
   filterAlbum,
   activeFilterChanged,
   favoritesFetched
} = actions