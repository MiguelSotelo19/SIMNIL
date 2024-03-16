import React, { useState } from 'react';
import { StyleSheet, View, Button, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import { Header } from '../elements/Header';
import { BarChart } from 'react-native-chart-kit';

const Estadistica = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWell, setSelectedWell] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const pozos = [
    { nombre: 'Satelite', comunidad: 'Comunidad A', nivelAgua: 550 },
    { nombre: 'Jacarandas', comunidad: 'Comunidad B', nivelAgua: 210 },
    { nombre: 'Temixco', comunidad: 'Comunidad C', nivelAgua: 300 },
    { nombre: 'Zapata', comunidad: 'Comunidad D', nivelAgua: 600 },
    { nombre: 'Xochitepec', comunidad: 'Comunidad E', nivelAgua: 100 },
  ];

  const handleWellPress = (index) => {
    setSelectedWell(pozos[index]);
    setModalVisible(true);
  };

  const data = {
    labels: pozos.map((pozo) => pozo.nombre),
    datasets: [
      {
        data: pozos.map((pozo) => pozo.nivelAgua),
      },
    ],
  };

  const handleStartDateChange = (text) => {
    setStartDate(text);
    // Aquí puedes implementar la lógica para filtrar los datos según la fecha seleccionada
  };

  const handleEndDateChange = (text) => {
    setEndDate(text);
    // Aquí puedes implementar la lógica para filtrar los datos según la fecha seleccionada
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {pozos.map((pozo, index) => (
          <View style={styles.wellItemContainer} key={index}>
            <Text style={styles.wellItem}>{pozo.nombre}</Text>
            <Button title="Información" onPress={() => handleWellPress(index)} />
          </View>
        ))}
      </View>
      <BarChart
        data={data}
        width={380}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          borderColor: '#000000',
          borderWidth: 2,
        }}
        bezier
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Información del pozo:</Text>
          <View style={styles.modalInfo}>
            <Text style={styles.modalInfoItem}>Nombre: {selectedWell?.nombre}</Text>
            <Text style={styles.modalInfoItem}>Comunidad: {selectedWell?.comunidad}</Text>
            <Text style={styles.modalInfoItem}>Nivel de Agua: {selectedWell?.nivelAgua}</Text>
            <TextInput
              style={styles.input}
              placeholder="Fecha de inicio (YYYY-MM-DD)"
              value={startDate}
              onChangeText={handleStartDateChange}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de fin (YYYY-MM-DD)"
              value={endDate}
              onChangeText={handleEndDateChange}
            />
          </View>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Estadistica;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wellItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  wellItem: {
    fontSize: 16,
    marginRight: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInfo: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  modalInfoItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});