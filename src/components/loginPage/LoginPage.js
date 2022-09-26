import Button from 'react-bootstrap/Button';
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import "./loginPage.scss"

const LoginPage = () => {
   const dispatch = useDispatch()
   
   let user = localStorage.getItem("user") 
   let navigate = useNavigate()
   useEffect(() => {
      navigatePage()
   }, [user])

   async function signIn() {
      let provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      getUser()
      if(user){
         navigate("../", { replace: true })
      }
   }
   const navigatePage = () => {
      if(user === "true"){
         navigate("../", { replace: true })
      }else if(user === "false"){
         console.log("лох")
      }
   }

   const hendlerLodin = () => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(getUser)
      .then(console.log(user))
      .catch(console.error)
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
      navigatePage()
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
      onSubmit: hendlerLodin
   })
   console.log(formik.values.email);

   return(
      <div className='back'>
         <div className="login-page">
            <div className="form">
               <Button id='google-button' onClick={() => signIn()} variant="outline-primary">Ввойти с помощью Google</Button>
               <form onSubmit={formik.handleSubmit}  className="login-form">
                  <input type="email" 
                     placeholder="email"
                     onChange={formik.handleChange} 
                     value={formik.values.email} 
                     name="email"
                     id="inputEmail"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                  <input type="password" 
                     placeholder="password"
                     onChange={formik.handleChange} 
                     value={formik.values.password} 
                     name="password" 
                     id="inputPassword"
                     onBlur={formik.handleBlur}/>
                     {formik.errors.password && formik.touched.password  ? <div>{formik.errors.password}</div> : null}
                  <button type='submit'>login</button>
                  <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
               </form>
            </div>
         </div>
      </div>
   )
}

export default LoginPage