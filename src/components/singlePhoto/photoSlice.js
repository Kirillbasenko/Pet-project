import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook"
import { addDoc, getDocs, collection, getFirestore } from "firebase/firestore";
import {app, db} from "../../fireBase"
import { initializeApp } from 'firebase/app'; 
import { array } from "prop-types";

const initialState = {
   photo: [],
   photoLoadingStatus: 'idle',
   term: "",
}

export const getPhoto = createAsyncThunk(
   "photo/getPhoto",
   (id) => {
      const {request} = useHttp()
      return request(`https://jsonplaceholder.typicode.com/photos/${id}`)
   }
)

const firebaseConfig = {
   apiKey: "AIzaSyDsb6Q4ukmOLZKFME82a3oFoRyjbBgEgd0",
   authDomain: "petpr-b454c.firebaseapp.com",
   projectId: "petpr-b454c",
   storageBucket: "petpr-b454c.appspot.com",
   messagingSenderId: "128429972629",
   appId: "1:128429972629:web:cf228d84bfb6e2e4b2cf9c",
   measurementId: "G-PDXDCT6SPF"
   };

export const saveMassage = createAsyncThunk(
   "photo/savePhoto",
   (item) => {
      addDoc(collection(db, "photos"), {
         ID: item.id,
         album: item.albumId,
         title: item.title,
         url: item.url
      });
   }
)

export const saveMassages = createAsyncThunk(
   "photo/savePhotos",
   (arr) => {
      arr.forEach(item => {
         addDoc(collection(db, "photos"), {
         ID: item.id,
         album: item.albumId,
         title: item.title,
         url: item.url
      });
      })
   }
)

/*export const readMassage = createAsyncThunk(
   "photo/readPhoto",
   ()  =>  {
      const querySnapshot = getDocs(collection(db, "photos"))
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
      console.log(doc.data());
      });
   }
)*/

const photoSlice = createSlice({
   name: "photo",
   initialState,
   reducers: {
      photoFetching: state => {state.photoLoadingStatus = 'loading'},
      photoFetched: (state, action) => {
         state.photo = action.payload
      },
      photoFetchingError: state => {state.photoLoadingStatus = 'error'},
   },
   extraReducers: (builder) => {
      builder
         .addCase(getPhoto.pending, state => {state.photoLoadingStatus = 'loading'})
         .addCase(getPhoto.fulfilled, (state, action) => {
               state.photoLoadingStatus = 'idle';
               state.photo = action.payload
            })
         .addCase(getPhoto.rejected, state => {state.photoLoadingStatus = 'error'})
         .addDefaultCase(() => {})
   }
})

const {actions, reducer} = photoSlice

export default reducer;
export const {
   photoFetching,
   photoFetched,
   photoFetchingError
} = actions