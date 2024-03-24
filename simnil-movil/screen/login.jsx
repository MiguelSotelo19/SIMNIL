import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Alert,
  Modal,
  Pressable
} from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const navigation = useNavigation();

  const validar = async () => {
    try {
      console.log("Haciendo solicitud HTTP...");
      const response = await axios.get(
        "http://10.0.2.2:8080/api/simnil/persona/"
      );
      console.log("Respuesta de la solicitud HTTP:", response.data.data);

      for (let i = 0; i < response.data.data.length; i++) {
        const usuario = response.data.data[i];
        if (
          usuario.nombreUsuario === nombreUsuario &&
          usuario.contrasenia === contrasenia &&
          (usuario.rolBean.rol === "Admin" || usuario.rolBean.rol === "Empleado") &&
          usuario.estatus === true
        ) {
          console.log("Inicio de sesión exitoso");
          navigation.navigate("Bottom");
          return;
        }
        if (
          usuario.nombreUsuario === nombreUsuario &&
          usuario.contrasenia === contrasenia &&
          usuario.rolBean.rol === "Visitantes" &&
          usuario.estatus === true
        ) {
          console.log("Inicio de sesión exitoso");
          navigation.navigate("Visitantes");
          return;
        }
      }
      if (!nombreUsuario || !contrasenia) {
        show_alerta("Usuario y/o contraseña incorrectos", "error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      show_alerta("No se pudo conectar al servidor", "error");
    }
  };

  const show_alerta = (mensaje, tipo) => {
    console.log(mensaje, tipo);
    Alert.alert("Error", mensaje);
  };

  const handleForgotPassword = async () => {
    try {
      // Realizar la solicitud HTTP para cambiar la contraseña
      const response = await axios.put(
        "http://10.0.2.2:8080/api/simnil/persona/recovery",
        {
          
          nombreUsuario: nombreUsuario, 
          
        }
      );
  
      // Manejar la respuesta exitosa del servidor
      console.log("Respuesta de la solicitud HTTP:", response.data);
  
      // Mostrar un mensaje de éxito al usuario
      Alert.alert("Éxito", "Se ha cambiado la contraseña exitosamente");
  
      // Cerrar el modal de recuperación de contraseña
      setModalVisible(false);
    } catch (error) {
      // Manejar los errores que ocurran durante la solicitud HTTP
      console.error("Error al cambiar la contraseña:", error);
  
      // Mostrar un mensaje de error al usuario
      Alert.alert(
        "Error",
        "No se pudo cambiar la contraseña. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido!</Text>

      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Card containerStyle={styles.cardContainer}>
        <View>
          <Text style={styles.baseText}>Usuario</Text>
          <TextInput
            style={styles.input}
            value={nombreUsuario}
            onChangeText={(text) => setNombreUsuario(text)}
          />
          <Text style={styles.baseText}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={contrasenia}
            onChangeText={(text) => setContrasenia(text)}
            secureTextEntry={true}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={validar}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.baseText2} >Usuario</Text>
            <TextInput
              style={styles.inputmodal}
              value={nombreUsuario}
              onChangeText={(text) => setNombreUsuario(text)}
            
            />

            <Text style={styles.baseText2}>Nueva Contraseña:</Text>
            <TextInput
              style={styles.inputmodal}
              value={contrasenia}
              onChangeText={(text) => setContrasenia(text)}
              secureTextEntry={true}
            />

            <Pressable
              style={[styles.buttonmodal, styles.buttonClose]}
              onPress={handleForgotPassword}
            >
              <Text style={styles.textStyle}>Cambiar Contraseña</Text>
            </Pressable>

            <Pressable
              style={[styles.buttocerrar, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={[styles.circle, { height: windowHeight * 0.4 }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72BCED",
   
  },
  welcomeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 50,
    marginBottom: 20,
  },
  logo: {
    height: "30%",
    aspectRatio: 1,
  },
  cardContainer: {
    width: "80%",
    backgroundColor: "#E5EBF6",
    borderRadius: 10,
    zIndex: 1,
    marginTop: 20,
    padding: 20,
  },
  baseText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 25,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    alignSelf: "center",
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#191970",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  circle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 350,
    borderTopRightRadius: 350,
    zIndex: 0,
  },
  buttonContainer: {
    alignItems: "center",
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "#191970",
    textAlign: "center",
    textDecorationLine: "underline",
  },
 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  //Modal
  buttonmodal: {
    backgroundColor: "#00913f",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
   
  },
  buttocerrar: {
    backgroundColor: "#FF0000",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
    
    textAlign: "center",
  },
  inputmodal: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    width:90,
    borderRadius: 5,
    marginTop: 10,
    height:45 ,
   
    paddingLeft: 10,
  },

  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  baseText2: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
    marginTop: 25,
  },
  
  modalText: {
    marginBottom: 15,
  }
});