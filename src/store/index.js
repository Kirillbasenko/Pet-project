import photos from "../components/mainPage/photosSlice"
import photo from "../components/singlePhoto/photoSlice"
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
   if(typeof action === "string"){
      return next({
         type: action
      })
   }
   return next(action)
}

const store = configureStore({
   reducer: {photos, photo},
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
   devTools: process.env.NODE_ENV !== "production"
})

export default store;