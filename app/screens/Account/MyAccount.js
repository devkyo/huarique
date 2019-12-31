import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import * as firebase from 'firebase'


// componentes 
import Loading from '../../components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'



export default function MyAccount() {
   const [login, setLogin] = useState(null)

   // actualizando state de estado de logeado 
   useEffect( ()=> {
      firebase.auth().onAuthStateChanged(user => {
         !user ? setLogin(false) : setLogin(true)

      })
   }, [])


// validad si esta logeado 
   if(login === null){
      return (
         <Loading isVisible={true} text='Cargando..' />


      )

      
   }


  return login ? <UserLogged/> : <UserGuest/>
  
}

