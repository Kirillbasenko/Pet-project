import "./createElem.scss"
import { useState, useRef, useEffect } from "react"
import { addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../../fireBase"

import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector} from "react-redux";


const CreateElem = () => {

   const [src, setSrc] = useState("")
   const dispatch = useDispatch()
   const wrraper = useRef(null)
   const file = useRef(null)
   const id = useRef(null)
   

   const douwload = async () => {
      let reader = new FileReader()
      reader.readAsDataURL(file.current.files[0])
      reader.onload = function (){
         setSrc(reader.result)
      }
   }

   const savePhoto = () => {
      addDoc(collection(db, "photos"), {
         id: formik.values.id,
         album: formik.values.album,
         title: formik.values.title,
         src: src,
         catalog: formik.values.catalog
      });
      formik.values.id = ""
      setSrc("")
      formik.values.album = ""
      formik.values.title = ""
      formik.values.catalog = ""
   }

/***********************************************Formik******************************************** */
const formik = useFormik({
      initialValues:{
         id: "",
         album: "",
         title: "",
         catalog: "All"
      },
      validationSchema: Yup.object({
         id: Yup.string()
                  .required("Обязательное поле"),
         album: Yup.string()
                  .required("Обязательное поле"),
         title: Yup.string()
                  .min(5, "Минимум 5 символа")
                  .required("Обязательное поле"),
      }),
      onSubmit: savePhoto
   })
/************************************************************************************************* */
   return(
      <div className="page-other">
         <div className="single">
            <form className="content" onSubmit={formik.handleSubmit}>
               <div>
                  <label htmlFor="text" className="id__label">ID:</label>
                  <input onChange={formik.handleChange}
                  ref={id}
                     value={formik.values.id} 
                     className="id" 
                     type="id" 
                     name="id"
                     id="inputId"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.id && formik.touched.id  ? <div className="div error">{formik.errors.id}</div> : null}
               </div>
               <div>
                  <label className="album__label">Album:</label>
                  <input onChange={formik.handleChange}
                     value={formik.values.album} 
                     className="album" 
                     type="album" 
                     name="album"
                     id="inputAlbum"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.album && formik.touched.album  ? <div className="div error">{formik.errors.album}</div> : null}
               </div>
               <input onChange={formik.handleChange} 
                  value={formik.values.title} 
                  className="title" 
                  type="title" 
                  name="title"
                  id="inputTitle"
                  onBlur={formik.handleBlur}/>
                  {formik.errors.title && formik.touched.title  ? <div className="div error">{formik.errors.title}</div> : null}
                  <select id="cal"
                     onChange={formik.handleChange}
                     value={formik.values.catalog} 
                     name="catalog"
                     onBlur={formik.handleBlur}>
                     <option value="All">All</option>
                     <option value="Nature">Nature</option>
                     <option value="Sport">Sport</option>
                  </select>
               <div ref={wrraper} className="wrraper">
                  <img src={src} alt="" />
                  
               </div>
               <input ref={file} onChange={() => douwload()} className="file" type="file" />
               <button type="submit">Save</button>
            </form>
         </div>
         </div>
      )
}

export default CreateElem