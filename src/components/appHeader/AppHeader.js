import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import "./appHeader.scss"

import {filtersFetched, activeFilterChanged, filterABC, filterAlbum} from "../mainPage/photosSlice";


function AppHeader() {
   let dispatch = useDispatch()

   const {filterPhotosList} = useSelector(state => state)

   return (
      <Navbar className='mb-3 ' bg="light" expand="lg">
         <Container fluid>
         <Link className='header__link' to="/">Photos project</Link>
         <Navbar.Toggle aria-controls="navbarScroll" />
         <Navbar.Collapse className='justify-content-end' id="navbarScroll">
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
               <Button variant="outline-success">Search</Button>
            </Form>
         </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default AppHeader;