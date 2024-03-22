import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import { Header } from '../elements/Header';

const Valvulas = () => {
  const [pozos, setPozos] = useState([]);
  const [switchValues, setSwitchValues] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Configuración para el servidor MQTT
    init({
      size: 10000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      sync: {},
    });

    // Opciones de conexión MQTT
    const options = {
      host: '3.87.76.132',
      port: 9001,
      id: 'id_' + parseInt(Math.random() * 100000),
    };

    const mqttClient = new Paho.MQTT.Client(options.host, options.port, 'usernameClient');

    const onConnect = () => {
      console.log('Conectado al Servidor MQTT en EC2');
    };

    mqttClient.connect({
      onSuccess: onConnect,
      useSSL: false,
      onFailure: (error) => {
        console.log('Error en lo Siguiente: ' + error);
      },
    });

    setClient(mqttClient);

    return () => {
      mqttClient.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8080/api/simnil/pozos/');
        setPozos(response.data.data);
        setSwitchValues(Array(response.data.data.length).fill(0));
      } catch (error) {
        console.error('Error al obtener los datos de los pozos:', error);
      }
    };

    fetchData();
  }, []);

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
    client.publish('prueba/encendido', '1');
  };

  const apagarLed = () => {
    client.publish('prueba/encendido', '0');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{item.nombre}</Text>
      <Text style={styles.text}>{item.ubicacion}</Text>
      <Switch value={switchValues[index] === 1} onValueChange={() => toggleSwitch(index)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Control de válvulas</Text>
        <FlatList
          data={pozos}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
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
