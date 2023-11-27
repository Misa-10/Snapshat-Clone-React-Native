import React from "react";
import { Alert, StyleSheet, Text, View, Pressable,Image, Button, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Register({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const cookies = new Cookies();
    async function onRegister() {
        //todo : requete axios pour se connecter
        if(password !== confirmPassword){
            Alert.alert("Erreur: Les mots de passe ne correspondent pas");
        }else{
          if(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
            Alert.alert(password)
          const RegisterData = {
            email,
            password
          }
          const config = {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
          await axios.post('http://snapi.epitech.eu:8000/inscription', RegisterData, config)
          .then( (res) =>{
            console.log(res.data);
            cookies.set('token', res.data.data.token, { path: '/' });
            Alert.alert("Vous êtes désormais inscrit");
          })
            .catch( (err) =>{
              console.log(err);
              Alert.alert("Erreur de communication avec le serveur");
            })
          }else{
            Alert.alert("Erreur: Email incorrect");
          }
        }
        
    }
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#F8F403",
            flex: 1,
            marginBottom:0,
            alignItems: "center",
        },
        RegisterTitle: {
            fontSize: 50,
            marginTop: "30%",
        },
        TextInput: {
            marginVertical: 8,
            width: "80%",
        },
        connectBtn: {
            marginTop: 15,
            backgroundColor: "#FF0035",
            padding: 15,
            borderRadius: 4,
        },
        returnBtn: {
          marginTop: 15,
          backgroundColor: "#FF0035",
          padding: 15,
          borderRadius: 4,
      },
        textConnectBtn: {
            fontSize: 25,
            color: "white",
        },
        textReturnBtn: {
          fontSize: 20,
          color: "white",
      }

    });
    return(
        <View style={styles.container}>
            
            <Text style={styles.RegisterTitle}>Inscription</Text>
            <TextInput
                style={styles.TextInput}
                label="Email"
                mode="outlined"
                theme={{ colors: { primary: "black" } }}
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail( email )}
                />

            <TextInput
              style={styles.TextInput}
              label="Mot de passe"
              mode="outlined"
              theme={{ colors: { primary: "black" } }}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
            <TextInput
              style={styles.TextInput}
              label="Confirmer le mot de passe"
              mode="outlined"
              theme={{ colors: { primary: "black" } }}
              secureTextEntry={true}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
              value={confirmPassword}
            />
            <Pressable style={styles.connectBtn} onPress={() => onRegister()}>
              <Text style={styles.textConnectBtn}>S'inscrire</Text>
            </Pressable>
            <Pressable style={styles.returnBtn}
            onPress={() => navigation.navigate("Home")}>
              <Text style={styles.textReturnBtn}>Retour au menu</Text>
            </Pressable>
        </View>

    )
}