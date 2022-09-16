import {useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import { Link } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useHttp} from "../../hooks/http.hook"
import {getAllPhotos} from "./photosSlice"
import { useDispatch, useSelector } from "react-redux";

import "./mainPage.scss";

const MainPage = () => {
   const {photosList, photosLoadingStatus, term, filterPhotosList} = useSelector(state => state.photos)

   const dispatch = useDispatch()
   //const {request} = useHttp()

   useEffect(() => {
      dispatch(getAllPhotos())
   }, [])

   

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
                     <div className="char__content">
                        <div className="char__name">{item.title}</div>
                        <div className="char__album">№{item.albumId}</div>
                     </div>
                     <img  src={item.thumbnailUrl} alt={item.title}/>
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

   const items = renderItems(photosList)
   const filterItems = renderItems(filterPhotosList)
   return(
      <div className="char__list">
            {term && filterItems ? filterItems : items}
      </div>
   )
}

export default MainPage