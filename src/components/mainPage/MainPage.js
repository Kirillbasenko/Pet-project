import {useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage';
import {readMessage} from "./photosSlice"
import { useDispatch, useSelector } from "react-redux";
import {createdFetched} from "./photosSlice"
import {photoFetched} from "../singlePhoto/photoSlice"

import "./mainPage.scss";

const MainPage = () => {
   const {photosList, photosLoadingStatus, filterPhotosList, createdPhotos, activeCatalog, term} = useSelector(state => state.photos)
   const {token} = useSelector(state => state.user)
   console.log(token);

   let user = localStorage.getItem("user") 
   const favoriteBtn = useRef([])
   favoriteBtn.current = []
   const dispatch = useDispatch()
   let navigate = useNavigate()

   if(user === "true"){
         console.log("лох");
   }else if(user === "false"){
         navigate("../login", { replace: true })
   }

   const addBtn = (el) => {
      if(el && !favoriteBtn.current.includes(el)){
         favoriteBtn.current.push(el)
      }
      console.log(favoriteBtn.current);
   }

   const change = () =>  {
      let items = []
      photosList.forEach(doc => {
         items.push(doc.data())
      })
      return items
   }

   useEffect(() => {
      dispatch(createdFetched(change()))
   }, [photosList])

   useEffect(() => {
      dispatch(readMessage())
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

   const getActiveBtn = () => {
      
   }

   const addFavorite = (id) => {
      let photos = getLocalPhotos()
      let arr = createdPhotos[id]
      let users = photos.find(item => item.id === arr.id)
      let index = photos.indexOf(users)
////////////////////////////////////////////////////////////////////
      if(!users){
         photos.push(arr)
         //favoriteBtn.current[id].classList.add("active")
      }else{
         photos.splice(index, 1)
         //favoriteBtn.current[id].classList.remove("active")
      } 
      localStorage.setItem("arr", JSON.stringify(photos))
      //console.log(activeBtn);
      //console.log(indexBtn);
      let arrBtn = []
      photos.forEach((item) => {
         let index = createdPhotos.indexOf(item)
         arrBtn.push(index)
      })
      console.log(arrBtn);
      //console.log(indexBtn);
      //console.log(id);
      //indexBtn.current.forEach(item => )
   }

   function renderItems (arr){
      let array = []
      arr.forEach(doc => {
         array.push(doc.data())
      })
      const items = array.map((item, index) => {
            return(
               <li 
                  className="char__item"
                  key={item.id}>
                     <img  src={item.src} alt={item.title}/>
                     <div className="char__content">
                        <div className="char__name">{item.title.length < 20 ? item.title : `${item.title.slice(0, 28)}...`}</div>
                        <div className="char__album">№{item.album}</div>
                     </div>
                     <div className='char__buttons'>
                        <Link onClick={() => dispatch(photoFetched(createdPhotos[index]))} to={`/${item.id}`} className="char__button">details</Link>
                        <button ref={addBtn} onClick={(e) => addFavorite(index)} className='char__add'>favorites</button>
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
      <div className='main-back'>
         <div className="char__list">
               {term || activeCatalog ? filterItems : items}
         </div>
      </div>
   )
}

export default MainPage