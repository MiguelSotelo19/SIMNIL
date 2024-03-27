import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import { Header } from '../elements/Header';

const Valvulas = () => {
  const [pozos, setPozos] = useState([]);
  const [switchValues, setSwitchValues] = useState([]);
  const [client, setClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [comunidades, setComunidades] = useState([]);

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
        console.log('Datos',response)
        const initialSwitchValues = response.data.data.map(pozo => pozo.estatus === true);
        setSwitchValues(initialSwitchValues);
        console.log('Pozo',initialSwitchValues)
        setComunidades(response.data.data.map(pozo => pozo.comunidadesBeans.map(comunidad => comunidad.nombre)));
      } catch (error) {
        console.error('Error al obtener los datos de los pozos:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSwitch = (index) => {
    const newSwitchValues = [...switchValues];
    newSwitchValues[index] = !newSwitchValues[index];
    setSwitchValues(newSwitchValues);
    
    if (newSwitchValues[index]) {
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

  const filteredPozos = pozos.filter(pozo => pozo.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nombre} </Text>
      <Text style={styles.itemText}>{comunidades[index]}</Text>
      <Switch 
        value={switchValues[index]} 
        onValueChange={() => toggleSwitch(index)} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Control de válvulas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del pozo"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <FlatList
          data={filteredPozos}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Nombre del Pozo</Text>
              <Text style={styles.headerText}>Comunidad</Text>
            </View>
          )}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} 
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  itemText: { flex: 1, textAlign: 'center' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  headerText: { flex: 1, textAlign: 'center', fontWeight: 'bold' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10,borderRadius :5 },
});

export default Valvulas;
