import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import * as firebase from 'firebase'
import InfoUser from '../../components/Account/InfoUser'




export default function UserLogged(){

   const [ userInfo, setUserInfo ] = useState([])
   const [ reloadData, setReloadData ] = useState(false)

   // cargando info de usuario firebase 
   useEffect( () => {
      ( async () => {
         const user = await firebase.auth().currentUser
         setUserInfo(user.providerData[0])
      })()
   }, [])

   

   return(
      <View>
         <InfoUser userInfo={userInfo} />
         
         <Button 
            title='Cerrar sesión'
            onPress={ () => firebase.auth().signOut()}
         />


      </View>
   )
}

const styles = StyleSheet.create({
   boton: {
      marginTop: 40,
      marginBottom: 20
   }
})