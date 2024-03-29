import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Tu lógica de inicio de sesión aquí
    // Después de iniciar sesión, limpiamos los campos del formulario
    setUsername('');
    setPassword('');
    navigation.navigate('Bottom');
  };

  const windowHeight = Dimensions.get('window').height;

  return (
    <ScrollView contentContainerStyle={{ flexGrow:1}}>
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
              secureTextEntry={true} // Corregido aquí para ocultar el texto
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <View style={[styles.circle, { height: windowHeight * 0.4 }]}></View>
      </View>
    </ScrollView>
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
    paddingLeft: 10, // Ajuste para desplazar el texto hacia la derecha
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
