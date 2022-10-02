import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import {userInside} from "../mainPage/photosSlice"
import { useDispatch, useSelector } from "react-redux";
import {useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./registerPage.scss"

const RegisterPage = () => {
   const dispatch = useDispatch()
   let navigate = useNavigate()
   const error = useRef("")
   const success = useRef("")
   const hendlerRegister = () => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(() => {
         success.current.style.display = "block"
         error.current.style.display = "none"
         signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
         getUser()
      })
      .catch(() => {
         error.current.style.display = "block"
         success.current.style.display = "none"
      });
   }

   const getUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (users) => {
      if (users) {
         localStorage.setItem("user", true)
         navigate("../", { replace: true })
      } else {
         localStorage.setItem("user", false)
      }
      });
   }

   const formik = useFormik({
      initialValues:{
         email: "",
         password: ""
      },
      validationSchema: Yup.object({
         email: Yup.string()
                  .email("Неправильный email адрес")
                  .required("Обязательное поле"),
         password: Yup.string()
                  .min(5, "Минимум 5 символа")
                  .required("Обязательное поле"),
      }),
      onSubmit: hendlerRegister
   })

   return(
      <div className="back">
         <div class="login-page">
            <div class="form">
               <form onSubmit={formik.handleSubmit} class="register-form">
                  <input 
                     onChange={formik.handleChange} 
                     value={formik.values.email} 
                     name="email" 
                     type="email" 
                     className="htmlForm-control" 
                     id="inputEmail"
                     onBlur={formik.handleBlur} 
                     placeholder="name"/>
                  <input 
                     onChange={formik.handleChange} 
                     value={formik.values.password} 
                     name="password" 
                     type="password" 
                     className="htmlForm-control" 
                     id="inputPassword"
                     onBlur={formik.handleBlur} 
                     placeholder="password"/>
                  <button>create</button>
                  <div ref={error} className="not-user">Пользователь уже зерегистрирован</div>
                  <div ref={success} className="yes-user">Успешно</div>
                  <p class="message">Already registered? <Link to="/login">Sign In</Link></p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default RegisterPage