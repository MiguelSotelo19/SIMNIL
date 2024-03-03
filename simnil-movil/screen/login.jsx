import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Image, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation();

  const handleLogin = () => {
    
    navigation.navigate('Bottom');
  };
  return (
    <View style={styles.container}>
     
      <Text style={styles.welcomeText}>¡Bienvenido!</Text>

     
      <Image style={{ height: 300, width: 300, position: 'absolute', top: 50 }} source={require('../assets/logo.png')} />
      
     
      <Card containerStyle={{ width: 350,height:350, backgroundColor: "#E5EBF6", borderRadius: 10, zIndex: 1, position: 'absolute', top: 320 }}>
        <View>
          <Text style={styles.baseText} >Usuario</Text>
          <TextInput style={styles.input} />
          <Text style={styles.baseText}>Contraseña</Text>
          <TextInput style={styles.input} />
          
         
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
</View>
          
        </View>
      </Card>

      
      <View style={styles.circle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#72BCED"
  },
  welcomeText: {
    fontWeight: 'bold',
    color: "#FFFFFF",
    fontSize: 50,
    position: 'absolute',
    top: 20,
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5, 
    marginTop: 25
  },
  input: {
    marginBottom: 10, 
    backgroundColor: "#FFFFFF",
    borderColor: "gray", 
    borderWidth: 1,
    width: 250,
    marginLeft: 35,
    borderRadius: 5,
    marginTop: 10,
    height:40,


  },

  button: {
    backgroundColor: '#191970',
    paddingVertical: 9,
    paddingHorizontal: 20,
    paddingEnd:30,
    
    
    borderRadius: 5,
    marginTop: 30,
    width:250,
    justifyContent:'center'
    
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
    height: '40%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 350, 
    borderTopRightRadius: 350, 
    zIndex: 0, 
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
