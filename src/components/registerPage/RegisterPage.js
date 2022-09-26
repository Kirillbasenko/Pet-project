import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import {userInside} from "../mainPage/photosSlice"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import "./registerPage.scss"

const RegisterPage = () => {
   const dispatch = useDispatch()
   let navigate = useNavigate()
   let user = localStorage.getItem("user") 
   const hendlerRegister = (email, password) => {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then((userCredential) => {
         const user = userCredential.user;
         console.log(user);
      })
      .then(signInWithEmailAndPassword(auth, formik.values.email, formik.values.password))
      .then(getUser)
      //.then(user ? navigate("../main", { replace: true })  : console.log("лох"))
      .catch((error) => {
         console.log("Пошло по пизде");
         console.log(error);
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
      /*<div className="login">
         <div className="content">
            <div className="login__title">Register</div>
            <form onSubmit={formik.handleSubmit} className='form'>
               <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-htmlForm-label">Email</label>
                  <div className="col-sm-10">
                     <input 
                        onChange={formik.handleChange} 
                        value={formik.values.email} 
                        name="email" 
                        type="email" 
                        className="htmlForm-control" 
                        id="inputEmail"
                        onBlur={formik.handleBlur}/>
                        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                  </div>
               </div>
               <div className="mb-3 row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-htmlForm-label">Password</label>
                  <div className="col-sm-10"> 
                     <input 
                        onChange={formik.handleChange} 
                        value={formik.values.password} 
                        name="password" 
                        type="password" 
                        className="htmlForm-control" 
                        id="inputPassword"
                        onBlur={formik.handleBlur}/>
                        {formik.errors.password && formik.touched.password  ? <div>{formik.errors.password}</div> : null}
                  </div>
               </div>
               <div className="gfs center">
                  <button type="submit" className="btn btn-success me-3">Success</button>
                  <Link className="btn btn-success" to="/">Вход</Link>
               </div>
            </form>
         </div>
      </div>*/
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
                  <p class="message">Already registered? <Link to="/login">Sign In</Link></p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default RegisterPage