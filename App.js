import React, { Component } from 'react'
import { firebaseApp } from './app/utils/FireBase'
import Navigation from './app/navigations/Navigation'



import {
  StyleSheet,
  View,
  Text,
} from 'react-native'



export default class App extends Component{

  render(){

    return (

      <Navigation/>
    )

  }



}


const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 14
  }
  
})
