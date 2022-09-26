import {useEffect, useState, useMemo} from 'react';
import Spinner from '../spinner/Spinner';
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage';
import {readMessage} from "./photosSlice"
import { useDispatch, useSelector } from "react-redux";
import {createdFetched} from "./photosSlice"

import "./mainPage.scss";

const MainPage = () => {
   const {photosList, photosLoadingStatus, filterPhotosList, createdPhotos, activeCatalog, term} = useSelector(state => state.photos)
   const [item, setItem] = useState([])
   let user = localStorage.getItem("user") 
   const dispatch = useDispatch()
   let navigate = useNavigate()

   const getPhotos = () => {
      let items = []
      photosList.forEach(doc => {
         items.push(doc.data())
      }) 
      dispatch(createdFetched(items))
   }
   console.log(user);

   if(user === "true"){
         console.log("лох");
   }else if(user === "false"){
         navigate("../login", { replace: true })
   }

   useEffect(() => {
      dispatch(readMessage())
   }, [])
   
   useEffect(() => {
      getPhotos()
   }, [photosList])

   if(photosLoadingStatus === "loading"){
      return <Spinner/>
   } else if(photosLoadingStatus === "error"){
      return <ErrorMessage/>
   }

   const getLocalPhotos = () => {
      const photosLocal = localStorage.getItem("arr")
      if(photosLocal !== null){
         return JSON.parse(photosLocal)
      }else{
         return []
      }
   }

   const changeHeard = (id) => {
      let photos = getLocalPhotos()
      const heard = document.querySelectorAll(".char__add")
      let arr = photosList[id]
      let user = photos.find(item => item.id === id + 1)
      const index = photos.indexOf(user)
      if(!user){
         photos.push(arr)
         heard[id].classList.add("active")
      }else{
         photos.splice(index, 1)
         heard[id].classList.remove("active")
      } 
      
      localStorage.setItem("arr", JSON.stringify(photos))
   }

   function renderItems (arr){
      const items = arr.map((item, index) => {
            return(
               <li 
                  className="char__item"
                  key={item.id}>
                     <img  src={item.src} alt={item.title}/>
                     <div className="char__content">
                        <div className="char__name">{item.title}</div>
                        <div className="char__album">№{item.album}</div>
                     </div>
                     <div className='char__buttons'>
                        <Link to={`/${item.id}`} className="char__button">details</Link>
                        <button onClick={(e) => changeHeard(index)} className='char__add'>favorites</button>
                     </div>
               </li>
            )
      })
      return(
            <ul className="char__grid">
               {items}
            </ul>
      )
   } 

   const items = renderItems(createdPhotos)
   const filterItems = renderItems(filterPhotosList)
   console.log(filterPhotosList);
   return(
      <div className='main-back'>
         <div className="char__list">
               {term || activeCatalog ? filterItems : items}
         </div>
      </div>
   )
}

export default MainPage