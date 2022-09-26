import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore"; 
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signOut, getAuth, signInWithPopup } from "firebase/auth";

import "./appHeader.scss"

import {filtersFetched, activeFilterChanged, filterABC, filterAlbum, activeCatalogChanged} from "../mainPage/photosSlice";
import { useState } from 'react';


function AppHeader() {
   let dispatch = useDispatch()
   let navigate = useNavigate()
   let user = localStorage.getItem("user")
   console.log(user);
   

   function signOutUser() {
      signOut(getAuth());
      localStorage.setItem("user", false)
      navigate("../login", { replace: true })
   }

   const {filterPhotosList, activeCatalog} = useSelector(state => state.photos)
   console.log(activeCatalog);
   /****************************************FIREBASE*********************************************** */

   /************************************************************************************************** */
   return (
      <div className='header'>
      {user === "true" ?<Navbar bg="light" expand="lg">
         <Container fluid>
         <Link className='header__link' to="/">Photos project</Link>
         <Navbar.Toggle aria-controls="navbarScroll" />
         <Navbar.Collapse className='justify-content-end' id="navbarScroll">
            <button className='catalog' onClick={() => dispatch(activeCatalogChanged("All"))}>All</button>
            <button className='catalog' onClick={() => dispatch(activeCatalogChanged("Nature"))}>Nature</button>
            <button className='catalog' onClick={() => dispatch(activeCatalogChanged("Sport"))}>Sport</button>
            <Link className='favorit' to="/create">Create new</Link>
            <Link className='favorit' to="/favorit">Favoriter</Link>
            <Button onClick={() => {
                  dispatch(filterABC(filterPhotosList))}} className='me-3' variant="info">Sort alphabetically</Button>
               <Button onClick={() => {
                  dispatch(filterAlbum(filterPhotosList))}} className='me-3' variant="info">Sort №Album</Button>
            <Form className="d-flex">
               <Form.Control
               onChange = {(e) => {
                  dispatch(filtersFetched(e.target.value))
                  dispatch(activeFilterChanged())
               }}
               type="search"
               placeholder="Search"
               className="me-2"
               aria-label="Search"
               />
               <Button className="me-3" variant="outline-success">Search</Button>
               
               <button onClick={signOutUser} type="submit" className="btn btn-success">Выйти</button>
            </Form>
         </Navbar.Collapse>
         </Container> 
      </Navbar> : null}
      </div>
   )

}

export default AppHeader;