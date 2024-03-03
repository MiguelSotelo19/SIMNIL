import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Header } from "../elements/Header";

const Perfil = () => {
  const [position, setPosition] = useState("Administrador");
  const [user, setUser] = useState("Abel");

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

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  contactPosition: {

    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  contactInfo: {
    alignItems: "center",
  },
  contactItem: {
    fontSize: 30,
    
    fontWeight:'bold',
  
  },
  tel1: {
    fontSize: 20,
    paddingTop:-10,
    marginTop:50
  
  },
  email: {
    marginTop:50,
  },
  tel: {
    // marginTop: 95,
  },
  space: {
    height: 20, // Espacio entre elementos
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop:25, 
  },
  logo: {
    height: 200,
    width: 200,
    marginTop: -40,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#999999",
  },
  userDataContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  userData: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
  },
  userValueContainer: {
    marginTop:25,
    borderRadius: 5,
    width: 300,
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#d3d3d3",
  },
  positionValueContainer: {
    marginTop:25,
    borderRadius: 5,
    width: 300,
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#d3d3d3",
  },
  userValue: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 5,
    color: "#999999",
  },
  userText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  text: {
    fontSize: 25,
    // fontWeight: 'bold',
  },
});
