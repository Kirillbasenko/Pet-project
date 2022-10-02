import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../fireBase"

const initialState = {
   photosList: [],
   photosLoadingStatus: 'idle',
   favorites: [],
   filterFavorites: [],
   term: "",
   filterPhotosList: [],
   createdPhotos: [],
   activeCatalog: "",
   user: localStorage.getItem("user")
}

export const getAllPhotos = createAsyncThunk(
   "photos/getAllPhotos",
   () => {
      const {request} = useHttp()
      return request(`https://jsonplaceholder.typicode.com/photos`)
   }
)

export const saveMassages = createAsyncThunk(
   "photo/savePhoto",
   (arr) => {
      arr.forEach(item => {
         console.log("Hello");
         addDoc(collection(db, "photos"), {
         ID: item.id,
         album: item.albumId,
         title: item.title,
         url: item.url
      });
      })
   }
)

export const readMessage = createAsyncThunk(
   "photos/readMessages",
   () => {
      
      const querySnapshot = getDocs(collection(db, "photos"))
      return querySnapshot
      
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
         //state.photosList = state.photosList.sort((a, b) => a.title > b.title ? 1 : -1);
         //state.favorites = state.favorites.sort((a, b) => a.title > b.title ? 1 : -1);
         state.createdPhotos = state.createdPhotos.sort((a, b) => a.title > b.title ? 1 : -1)
      },
      filterAlbum: state => {
         //state.photosList = state.photosList.sort((a, b) => a.albumId > b.albumId ? 1 : -1);
         //state.favorites = state.favorites.sort((a, b) => a.albumId > b.albumId ? 1 : -1);
         state.createdPhotos = state.createdPhotos.sort((a, b) => a.album > b.album ? 1 : -1)
      },
      activeFilterChanged: (state, action) => {
               //state.filterPhotosList = state.photosList.filter(item => item.title.startsWith(state.term));
               //state.filterFavorites = state.favorites.filter(item => item.title.startsWith(state.term));
               state.filterPhotosList = state.createdPhotos.filter(item => item.title.startsWith(state.term))
            },
      favoritesFetched: (state, action) => {
               state.favorites = action.payload
            },
      createdFetched: (state, action) => {
               state.createdPhotos = action.payload
            },
      activeCatalogChanged: (state, action) => {
         state.activeCatalog = action.payload
         state.filterPhotosList = action.payload === "All" ? state.createdPhotos : state.createdPhotos.filter(item => item.catalog === action.payload)
      },
      userInside: (state, action) => {
         state.user = action.payload
      } 
   },
   extraReducers: (builder) => {
      builder
         .addCase(readMessage.pending, state => {state.photosLoadingStatus = 'loading'})
         .addCase(readMessage.fulfilled, (state, action) => {
               state.photosLoadingStatus = 'idle';
               state.photosList = action.payload
            })
         .addCase(readMessage.rejected, state => {state.photosLoadingStatus = 'error'})
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
   favoritesFetched,
   createdFetched,
   activeCatalogChanged,
   userInside
} = actions