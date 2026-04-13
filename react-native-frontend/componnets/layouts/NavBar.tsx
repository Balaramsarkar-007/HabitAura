import React from 'react'
import { Text, View } from 'react-native'
import { router } from 'expo-router';

export default function NavBar() {
  
    const sidebarItem = [
        {
            label : "Overview",
            screen : "overview",
            icon : "",
            onPress : () => router.push("/(main)/overview")
        }
    ]
  return (
    <View>
      <Text> textInComponent </Text>
    </View>
  )
}
