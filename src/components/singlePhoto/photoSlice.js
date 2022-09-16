import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook"

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

const photoSlice = createSlice({
   name: "photo",
   initialState,
   reducers: {
      photoFetching: state => {state.photoLoadingStatus = 'loading'},
      photoFetched: (state, action) => {
               state.photoLoadingStatus = 'idle';
               state.photo = action.payload
            },
      photoFetchingError: state => {state.photoLoadingStatus = 'error'}
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