import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, Text, Switch, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import { Header } from "../elements/Header";



const Valvulas = () => {
  const [switchValues, setSwitchValues] = useState([1]);
  const [enabled, setEnabled] = useState(false); // Estado para el Switch

  // Configuración para el servidor MQTT
  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
  });

  // Opciones de conexión MQTT
  const options = {
    host: '3.87.76.132',
    port: 9001,
    id: 'id_' + parseInt(Math.random() * 100000)
  };

  const client = new Paho.MQTT.Client(options.host, options.port, 'usernameClient');

  function onConnect() {
    console.log("Conectado al Servidor MQQT en EC2");
  }

  const toggleSwitch = (index) => {
    const newSwitchValues = [...switchValues];
    newSwitchValues[index] = newSwitchValues[index] === 1 ? 0 : 1;
    setSwitchValues(newSwitchValues);
    if (newSwitchValues[index] === 1) {
      prenderLed();
    } else {
      apagarLed();
    }
  };

  const prenderLed = () => {
    client.publish("prueba/encendido", "1");
  };

  const apagarLed = () => {
    client.publish("prueba/encendido", "0");
  };

  useEffect(() => {
    client.connect({
      onSuccess: onConnect,
      useSSL: false,
      onFailure: (error) => {
        console.log('Error en lo Siguiente: ' + error)
      }
    })
  }, [switchValues]);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{item[0]}</Text>
      <Text style={styles.text}>{item[1]}</Text>
      <Switch
        value={switchValues[index] === 1}
        onValueChange={() => toggleSwitch(index)}
      />
    </View>
  );

  const data = [
    ['Pozo Xochitepec', 'Xochitepec']
  
  ];

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Control de válvulas</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  text: { flex: 1, textAlign: 'center' },
});

export default Valvulas;
