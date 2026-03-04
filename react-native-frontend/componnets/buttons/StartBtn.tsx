import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
export default function StartBtn(){
    const router = useRouter();
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => router.push('/')}
        >
          <Text style={styles.text}>Get Started For Free
            <Ionicons style={styles.arrow} name="arrow-forward-outline" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : "#0D9488",
        paddingVertical : 15,
        paddingHorizontal : 40,
        borderRadius : 10,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    arrow : {
        marginLeft : 10,
    }
});

