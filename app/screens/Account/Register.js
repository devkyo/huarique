import React, { useRef , useState } from 'react'
import {StyleSheet, ScrollView, Image, View, Text } from 'react-native'
// modulo para scroll cuando abre teclado 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// modulo de toast 
import Toast  from 'react-native-easy-toast'

// importando nuestro component register form 
import RegisterForm from '../../components/Account/RegisterForm'


export default function Register(){

   const toastRef = useRef()


   return(
      <KeyboardAwareScrollView>
         <Image 
            source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
            style={styles.logo}
            resizeMode='contain'
         />
         <View style={styles.viewForm}>
            {/* pintando registerform pasandole la ref del toast  */}
            <RegisterForm
               toastRef={toastRef}
            />
         </View>
         {/* llamand component toast pasandole la ref */}
         <Toast 
            ref={toastRef}
            position='center' 
            opacity={0.5}
         />
      </KeyboardAwareScrollView>
   )
}

const styles = StyleSheet.create({
   logo: {
      width: '100%',
      height: 150,
      marginTop: 20
   },
   viewForm: {
      marginRight: 40,
      marginLeft: 40,
   }
})
