import "./singlePhoto.scss"
import { Link, useParams } from "react-router-dom"

import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

import Spinner from '../spinner/Spinner';
import { getDocs, collection} from "firebase/firestore";
import { db } from "../../fireBase"
import {saveMassage} from "./photoSlice"
import ErrorMessage from '../errorMessage/ErrorMessage';

const SinglePhoto = () => {
   const {photoId} = useParams()
   const {photo, photoLoadingStatus} = useSelector(state => state.photo)
   console.log(photo);
   
   
   const dispatch = useDispatch()

   const readMessage = async () => {
      const querySnapshot = await getDocs(collection(db, "photos"));
      querySnapshot.forEach((doc) => {
      console.log(doc.data());
   });
   } 

   useEffect(() => {
      
      //dispatch(saveMassage(photo))
      //readMessage()
      //dispatch(getPhoto(photoId))
   }, [])

   if(photoLoadingStatus === "loading"){
      return <Spinner/>
   } else if(photoLoadingStatus === "error"){
      return <ErrorMessage/>
   }

   const renderItem = (item) => {
      return(
         <div className="single">
            <img src={item.src} alt={item.title} />
            <div className="single__id">ID: {item.id}</div>
            <div className="single__album">Album: {item.album}</div>
            <div className="single__title">{item.title}</div>
            <Link to="/" className="single__button">Back</Link>
         </div>
      )
   }

   const items = renderItem(photo)
   return(
      <div className="page-other">
         {items}
      </div>
   )
}

export default SinglePhoto