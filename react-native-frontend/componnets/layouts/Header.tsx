import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Signin from '../buttons/Signin'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.image} 
          />
        </View>
        <View style={styles.authContainer}>
          <Signin text="Login" bgColor="#FFFFFF" textColor="#000000" />
          <Signin text="Sign up" bgColor="#00A63E" textColor="#FFFFFF" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    // height : 60,
    backgroundColor : "#F3F4F6",
    paddingHorizontal : 40,
    // paddingVertical : 10,
    zIndex : 100,
    position : "sticky",
    top : 0,
  },

  authContainer : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    
  },

  image : {
    width : 150,
    height : 50,
    resizeMode : "contain",
  }
})
