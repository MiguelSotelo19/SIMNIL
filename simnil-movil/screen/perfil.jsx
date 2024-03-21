<<<<<<< HEAD
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../elements/Header';
import {TabNav} from '../elements/TabNav'


 Perfil = () => {
    return (
        <View style={styles.container}>
            <Header />  
            <View style={styles.tabContainer}>  
            </View>
        </View>
    );
}
=======
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Header } from "../elements/Header";

const Perfil = () => {
  const [position, setPosition] = useState("Administrador");
  const [user, setUser] = useState("Abel");
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.contentContainer}>
        <Text style={styles.contactName}>Abel </Text>
        <Text style={styles.contactSe}>Makkonen Tesfaye</Text>
        <View style={styles.userDataContainer}>
          <View style={styles.userData}>
            <View style={styles.userValueContainer}>
              <Text style={styles.userText}>Usuario:           <Text style={{color:'gray'}}> {user}</Text></Text>
            </View>
          </View>
        </View>

        <View style={styles.userDataContainer}>
          <View style={styles.userData}>
            <View style={styles.positionValueContainer}>
              <Text style={styles.userText}>Puesto:        <Text style={{color:'gray'}}> {position}</Text>  </Text>
            </View>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Contacto</Text>
          <Text style={[styles.tel1, styles.tel]}>777-622-25-48</Text>

          <Text style={[styles.contactItem, styles.email, styles.text]}>
            usuario@gmail.com
          </Text>
        </View>
      </View>
    </View>
  );
};
>>>>>>> main

export default Perfil;

const styles = StyleSheet.create({
<<<<<<< HEAD
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20, //Ajusta según sea necesario
    },
    tabContainer: {
        flex: 1,
        width: '100%',
    },
    
=======
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20, 
  },
  contactName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginTop: 10,
  },
  contactSe: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  userDataContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  userData: {
    flexDirection: "row",
    alignItems: "center",
  },
  userValueContainer: {
    marginTop: 25,
    borderRadius: 5,
    width: "95%", 
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#d3d3d3",
  },
  positionValueContainer: {
    marginTop: 25,
    borderRadius: 5,
    width: "95%",
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#d3d3d3",
  },
  userText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop: 25,
  },
  contactInfo: {
    alignItems: "center",
  },
  contactItem: {
    fontSize: 30,
    fontWeight: "bold",
  },
  tel1: {
    fontSize: 20,
    paddingTop: -10,
    marginTop: 50,
  },
  email: {
    marginTop: 50,
  },

  text: {
    fontSize: 25,
 
  },
>>>>>>> main
});
