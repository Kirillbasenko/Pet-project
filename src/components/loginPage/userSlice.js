import { createSlice } from "@reduxjs/toolkit"; 

   const initialState = { 
      email: null, 
      token: null, 
      id: null, 
   } 
   const userSlice = createSlice({ 
      name: 'user', 
      initialState, 
      reducers: { 
         setUser: (state, action) => { 
            localStorage.setItem('isAuthEmail', action.payload.email) 
            state.email = action.payload.email; 
            state.token = action.payload.token; 
            state.id = action.payload.id; 
         }, 
         removeUser: (state) => { 
            localStorage.removeItem('isAuthEmail')
            state.email = null; 
            state.token = null; 
            state.id = null; 
            localStorage.setItem('isAuthEmail', state.email)
         } 
   } 
   }) 

   export const {setUser, removeUser} = userSlice.actions 
   export default userSlice.reducer