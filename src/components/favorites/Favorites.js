import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import {favoritesFetched} from "../mainPage/photosSlice"

const Favorites = (e) => {
   
   useEffect(() => {
      dispatch(favoritesFetched(arr))
   }, [])
   const dispatch = useDispatch()
   const {favorites, filterFavorites, term} = useSelector(state => state.photos)
   const arr = JSON.parse(localStorage.getItem("arr"))

   function renderItems (arr){
      if(arr){
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
                     </div>
               </li>
            )
         })
         return(
            <ul className="char__grid">
               {items}
            </ul>
      )
      }else{
         console.log("not");
      }
   }
   const items = renderItems(favorites) 
   const filterItems = renderItems(filterFavorites) 

   return(
      <div className="page-other">
         <div className="char__list">
            {term && filterItems ? filterItems : items}
         </div>
      </div>
   )
}

export default Favorites