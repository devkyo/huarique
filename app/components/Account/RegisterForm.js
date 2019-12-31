import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../utils/Validation'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'

import Loading from '../Loading'

function RegisterForm(props){
   
   
   // destructurando el ref de los toast enviando por las props
   const { toastRef , navigation }  = props

   const [ hidePassword, setHidePassword] = useState(true)
   const [ hiddeRepeatPassword, setHideRepeatPassword ] = useState(true)

   const [ isVisibleLoading, setIsVisibleLoading ] = useState(false)

   const [ email, setEmail] = useState('')
   const [ password, setPassword ] = useState('')
   const [ passwordRepeat, setRepeatPassword] = useState('') 



   const register = async () => {

      setIsVisibleLoading(true)

      // validando campos 
      if(!email || !password || !passwordRepeat) {
         // mostrando toast con notificacion 
         toastRef.current.show('Todos los campos son obligatorios.')
      }else {
         // validar email 
         if(!validateEmail(email)) {
            toastRef.current.show('El email es incorrecto.')
         }else {
            if(password !== passwordRepeat){
               toastRef.current.show('Las contraseñas no son iguales.')
            }else {
               await firebase
               .auth()
               .createUserWithEmailAndPassword(email,password)
               .then( ()=> {
                  navigation.navigate('MyAccount')
               })
               .catch( (e) => {
                 
                  if(e.code == 'auth/weak-password'){
                     toastRef.current.show('La contraseña debe ser minimo 6 caracteres')
                  }
                  if(e.code == 'auth/email-already-in-use'){
                     toastRef.current.show('El mail ya se encuentra registrado')
                  }
                  
               })

            }
         }
      }

      setIsVisibleLoading(false)

      
   }

   return(
      <View style={styles.formContainer}>
         <Input
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={ e => setEmail(e.nativeEvent.text) }
            rightIcon={
               <Icon
                  type='material-community'
                  name='at'
                  iconStyle={styles.iconRight}
                 
               />
            }
         />
         <Input 
            placeholder='Contraseña'
            password={true}
            secureTextEntry={hidePassword}
            containerStyle={styles.inputForm}
            onChange={ e => setPassword(e.nativeEvent.text) }
            rightIcon={
               <Icon
                  type='material-community'
                  name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                  iconStyle={styles.iconRight}
                  onPress={ ()=> setHidePassword(!hidePassword) }
               />
            }
         />
         <Input 
            placeholder='Repetir Contraseña'
            password={true}
            secureTextEntry={hiddeRepeatPassword}
            containerStyle={styles.inputForm}
            onChange={ e=> setRepeatPassword(e.nativeEvent.text) }
            rightIcon={
               <Icon
                  type='material-community'
                  name={hiddeRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
                  iconStyle={styles.iconRight}
                  onPress= { () => setHideRepeatPassword(!hiddeRepeatPassword)}
               />
            }
         />
         <Button 
            title='Unirse'
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            onPress={register}
         />
         <Loading 
            text='Creando cuenta'
            isVisible={isVisibleLoading}
         />
      </View>
   )
}

export default withNavigation(RegisterForm)


const styles = StyleSheet.create({
   formContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
   },
   inputForm: {
      width: '100%',
      marginTop: 30
   },
   iconRight: {
      color: '#c1c1c1'
   },
   btnContainerRegister: {
      marginTop: 20,
      width: '95%'
   },
   btnRegister: {
      backgroundColor: '#00a680'
   }
})