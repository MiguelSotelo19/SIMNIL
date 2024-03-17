import { Card, Image} from '@rneui/themed';
import { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation} from '@react-navigation/native';


Login = () => {
return(
        <View style={{
            width:300, height:350, alignContent:'center', justifyContent:'center' 
        }}>
            <Card container={{width:350, justifyContent:'center', alignContent:'center'}}>
                <Card.Title>Inicio de Sesion</Card.Title>
                <Card.Divider />
                <Image style={{ height: 100, width: 100 }} source={require('../assets/usuario.png')} />

              <View >
                <TextInput style={{marginBottom:10}} placeholder='Usuario: ' value={userName} onChangeText={setUserName} />
                <TextInput placeholder='Password: ' value={password} onChangeText={setPassword} />
              </View>
              <Button title={'Iniciar Sesion'} color={'black'} onPress={validateUser}/>
            </Card>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 380,
      height:400,
    }
  })