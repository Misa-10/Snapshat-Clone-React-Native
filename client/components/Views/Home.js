import React from "react";
import { StyleSheet, Text, View, Pressable,Image, Button, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Home({navigation}) {
  var {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFC00",
      flex:1,
      marginBottom:0,
      alignItems: "center",
      justifyContent: "space-between",

    },
    button1: {
      justifyContent: "center",
      paddingVertical: 20,
      paddingHorizontal: 32,
      marginVertical: 8,
      marginBottom:0,
      width: width,
      backgroundColor: "#FF0035"
    },
    button2: {
      justifyContent: "center",
      paddingVertical: 20,
      paddingHorizontal: 32,
      width: width,
      backgroundColor:"#3A8DE4"
    },
    text: {
      fontSize: 20,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
      justifyContent:"center",
      alignContent:"center",
      textAlign:"center",
    },
    input: {
      marginVertical: 8,

    },
  });

  return (
    <View style={styles.container}>
      <View style={{justifyContent:"center"}}>
      <Image source={require('../../assets/images/snapLogo.png')} style={{width: 150, height: 150, marginTop:"75%"}} />
      </View >
      <View style={{justifyContent:"center"}}>

      <Pressable
        style={styles.button1}
        onPress={() => navigation.navigate("Login")}
        >
        <Text style={styles.text}>Se connecter</Text>
      </Pressable>

      <Pressable 
      style={styles.button2}
      onPress={() => navigation.navigate("Register")}>
        <Text style={styles.text}>S'inscrire</Text>
      </Pressable>
        </View>
    </View>
  );
}
