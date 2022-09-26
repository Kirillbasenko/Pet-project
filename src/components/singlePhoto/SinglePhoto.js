import "./singlePhoto.scss"
import { Link, useParams } from "react-router-dom"

import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import Spinner from '../spinner/Spinner';
import { getDocs, collection} from "firebase/firestore";
import { db } from "../../fireBase"
import {getPhoto, saveMassage} from "./photoSlice"
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePhoto = () => {
   const {photoId} = useParams()
   const {photo, photoLoadingStatus} = useSelector(state => state.photo)
   
   
   const dispatch = useDispatch()

   const readMessage = async () => {
      const querySnapshot = await getDocs(collection(db, "photos"));
      querySnapshot.forEach((doc) => {
      console.log(doc.data());
   });
   } 

   useEffect(() => {
      
      dispatch(saveMassage(photo))
      readMessage()
      dispatch(getPhoto(photoId))
   }, [])

   if(photoLoadingStatus === "loading"){
      return <Spinner/>
   } else if(photoLoadingStatus === "error"){
      return <ErrorMessage/>
   }

   const renderItem = (item) => {
      return(
         <div className="single">
            <div className="single__id">ID: {item.id}</div>
            <div className="single__album">Album: {item.albumId}</div>
            <div className="single__title">{item.title}</div>
            <a className="single__photo" href={item.url}>{item.url}</a>
            <Link to="/" className="single__button">Back</Link>
         </div>
      )
   }

   const items = renderItem(photo)
   return(
      <>
         {items}
      </>
   )
}

export default SinglePhoto