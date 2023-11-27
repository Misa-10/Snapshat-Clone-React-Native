import React from "react";
import { Alert, StyleSheet, Text, View, Pressable,Image, Button, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();
    async function onLogin() {
        //todo : requete axios pour se connecter
        if(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
            const loginData = {
                "email": email,
                "password": password
            }
            const config = {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            const response = await axios.post('http://snapi.epitech.eu:8000/connection', loginData, config)
            .then( (res) =>{
                console.log("here")
                console.log(res.data);
                cookies.set('token', res.data.data.token, { path: '/' });
                Alert.alert("Vous êtes désormais connecté");
                navigation.navigate("Camera")
            })
            .catch( (err) =>{
                console.log(err);
                Alert.alert("Erreur: Email ou mot de passe incorrect");
            })
        }else{
            Alert.alert("Erreur: Format de l'email incorrect");
        }
       
        
    }
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#F8F403",
            flex: 1,
            marginBottom:0,
            alignItems: "center",
        },
        LoginTitle: {
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
            
            <Text style={styles.LoginTitle}>Connection</Text>
            <TextInput
                style={styles.TextInput}
                label="Email"
                mode="outlined"
                theme={{ colors: { primary: "black" } }}
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email)}
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
            <Pressable style={styles.connectBtn} onPress={() => onLogin()}>
              <Text style={styles.textConnectBtn}>Se connecter</Text>
            </Pressable>
            <Pressable style={styles.returnBtn}
            onPress={() => navigation.navigate("Home")}>
              <Text style={styles.textReturnBtn}>Retour au menu</Text>
            </Pressable>
        </View>

    )
}