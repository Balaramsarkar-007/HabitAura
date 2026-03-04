import React from "react";
import { Text, View, TouchableOpacity, StyleSheet} from "react-native";
import { useRouter } from "expo-router";

// props type
type buttonData = {
    text : string,
    bgColor : string,
    textColor : string,
}

export default function Signin( { text, bgColor, textColor } : buttonData) {
  const router = useRouter();

  return (
    <View
     style={[styles.constainer, {backgroundColor : bgColor}, {borderColor : textColor}]}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={[styles.text , {color: textColor}]} numberOfLines={1}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    padding : 12,
    paddingHorizontal : 25,
    borderRadius : 20,
    marginVertical : 10,
    marginHorizontal : 5,
    width : '100%',
    borderWidth : 1,
  },
  text : {
    fontSize : 17,
    fontWeight : "500",
  }
});
