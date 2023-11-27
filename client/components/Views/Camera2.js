import React from "react";
import { Alert, StyleSheet, Text, View, Pressable,Image, Button, Dimensions, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Camera, Permissions } from 'expo';



export default class CameraScreen extends React.Component {
    state = {
      hasCameraPermission: null,
    };
  
    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    }
  
    render() {
      const { hasCameraPermission } = this.state;
      if(hasCameraPermission === null) {
        return <View />;
      } else if(hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
                <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center', }}
                onPress={() => {
                  this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,});}
                }>
                  <Text style={{ fontSize: 16, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    }
  }