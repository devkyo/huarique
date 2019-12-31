import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import Loading from '../Loading'

export default function InfoUser(props){

   const { 
      userInfo,
      userInfo: { uid, displayName, email, photoURL}
   } = props
   
   const [ loading, setLoading ] = useState(false)

   // console.log(userInfo)

   const changeAvatar = async() => {
   
      // consultando permisos de camara roll  que retorbna un object 
      const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      resultPermissionCamera = resultPermissions.permissions.cameraRoll.status

      // validando si fue denegado el permiso 
      if(resultPermissionCamera === 'denied'){
         console.log('Es necesario aceptar los permisos')
      } else {
         // capturando la imagen selecionada
         const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
         })
         
         // validando si cancelo la eleccion de imagen o eligio y se guarda la imagen y el name de imagen por el udi del usuario
         if(result.cancelled) {
            console.log('Haz cerrado la galeria de imagenes')
         } else {
            setLoading(true)
            // creando funcion callback para subir a firebase 
            uploadImagen(result.uri, uid).then( ()=> {

               console.log('imagen subida correctamente')
               updatePhotoUrl(uid)
            })
         }
         
      }

   }

   // Subiendo imagen a firebase storage 
   const uploadImagen = async (uri, nameImage) => {
      const response = await fetch(uri)
      const blob = await response.blob()

      const ref = firebase
         .storage()
         .ref()
         .child(`avatar/${nameImage}`)
         // callback de imagen subida
      return ref.put(blob)
   }


   const updatePhotoUrl = uid => {
      firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then( async (result) => {

         const update = {
            photoURL: result
         }

         await firebase.auth().currentUser.updateProfile(update)
         console.log('imagen subida updateProfile')  

         setLoading(false)
         

      }).catch( (err)=> {
         console.log('error al recuperar el avatar', err)
      })
   }


   return (
      <View style={styles.viewUserInfo}>
         <Avatar
            rounded
            size='large'
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{
               uri: photoURL ? photoURL : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
             }}
         />
         <View>
            <Text style={styles.displayName}>
               {displayName ? displayName : 'Anónimo'}
            </Text>
            <Text> {email ? email : 'Social email'} </Text>
         </View>
         
         <Loading isVisible={loading}/>
      </View>
   )
}

const styles = StyleSheet.create({

   viewUserInfo: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      paddingTop: 30,
      paddingBottom: 30
   },
   userInfoAvatar: {
      marginRight: 20
   },
   displayName: {
      fontWeight: 'bold'
   }
})

