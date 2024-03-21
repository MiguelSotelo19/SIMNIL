import React, { useState} from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Image, Text, Dimensions, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 

export default function Login() {

/*
  const navigation = useNavigation();

 

  const handleLogin = () => {
      setUsername('');
      setPassword('');
    navigation.navigate('Bottom');
  };**/

  
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [usuarios, setUsuarios] = useState([]);
/*
  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    try {
      const respuesta = await axios.get('http://10.0.2.2:8080/api/simnil/persona/');
      setUsuarios(respuesta.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Alert.alert('Error', 'No se pudieron obtener los usuarios.');
    }
  };
  const validar = () => {
    let aux = true;
  
    for (let i = 0; i < usuarios.length; i++) {
      let usuario = usuarios[i];
      if (usuario.nombreUsuario === nombreUsuario && usuario.contrasenia === contrasenia) {
        aux = false;
        console.log('Inicio de sesión exitoso');
        navigation.navigate('Bottom');
        ;
        break;
      }
    }
  
    if (aux) {
      Alert.alert('Error', 'Usuario y/o contraseña incorrectos.');
    }
  };*/

  const windowHeight = Dimensions.get('window').height;

  const validar = async () => {
    try {
      const response = await axios.get('http:// 192.168.100.41:8080/api/simnil/persona/');
      console.log('Respuesta de la solicitud HTTP:', response.data);
  
      let usuarioValido = false;
      let contraseñaValida = false;
  
      for (let i = 0; i < response.data.length; i++) {
        const usuario = response.data[i];
        if (usuario.nombreUsuario() === nombreUsuario) {
          usuarioValido = true;
          if (usuario.contrasenia() === contrasenia) { 
            contraseñaValida = true;
            console.log('Inicio de sesión exitoso');
            navigation.navigate('Bottom');
            break;
          }
        }
      }
  
      if (!usuarioValido) {
        show_alerta('Usuario incorrecto', 'error');
      } else if (!contraseñaValida) {
        show_alerta('Contraseña incorrecta', 'error');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      show_alerta('No se pudo conectar al servidor', 'error');
    }
  };
  
  const show_alerta = (mensaje, tipo) => {
    console.log(mensaje, tipo);
    Alert.alert('Error', mensaje);
  };
  


  return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>

        <Image style={styles.logo} source={require('../assets/logo.png')} />

        <Card containerStyle={styles.cardContainer}>
          <View>
            <Text style={styles.baseText}>Usuario</Text>
            <TextInput
              style={styles.input}
             value={username}
             onChangeText={text => setUsername(text)}
            />
            <Text style={styles.baseText}>Contraseña</Text>
            <TextInput
              style={styles.input}
             value={password}
             
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={validar}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <View style={[styles.circle, { height: windowHeight * 0.4 }]}></View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#72BCED",
    minHeight: Dimensions.get('window').height,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: "#FFFFFF",
    fontSize: 50,
    marginBottom: 20,
  },
  logo: {
    height: '30%',
    aspectRatio: 1,
  },
  cardContainer: {
    width: '80%',
    backgroundColor: "#E5EBF6",
    borderRadius: 10,
    zIndex: 1,
    marginTop: 20,
    padding: 20,
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
    marginTop: 25,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    marginTop: 10,
    height: 40,
    alignSelf: 'center',
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#191970',
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  circle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 350,
    borderTopRightRadius: 350,
    zIndex: 0,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
