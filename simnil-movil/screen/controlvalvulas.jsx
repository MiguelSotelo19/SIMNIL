import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch, Dimensions, TouchableOpacity } from 'react-native';
import { Header } from '../elements/Header';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

const CustomSwitch = ({ value, onValueChange }) => {
  return (
    <View style={styles.switchContainer}>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
};

const Valvulas = () => {
  const [switchValues, setSwitchValues] = useState([true, false, true]);
  const [alertText, setAlertText] = useState('');
  const [alertIndex, setAlertIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailureModalVisible, setFailureModalVisible] = useState(false);

  const handleSwitchChange = (index) => {
    const newSwitchValues = [...switchValues];
    newSwitchValues[index] = !newSwitchValues[index];
    setSwitchValues(newSwitchValues);
    setAlertIndex(index);

    const text = newSwitchValues[index] ? '¿Está seguro de cambiar el estado de la válvula?' :'¿Está seguro de cambiar el estado de la válvula?' ;
    setAlertText(text);
    setModalVisible(true);
  };

  const closeModal = (accepted) => {
    setModalVisible(false);
    if (accepted) {
      setSuccessModalVisible(true);
    } else {
      setFailureModalVisible(true);
      const newSwitchValues = [...switchValues];
      newSwitchValues[alertIndex] = !newSwitchValues[alertIndex];
      setSwitchValues(newSwitchValues);
    }
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const closeFailureModal = () => {
    setFailureModalVisible(false);
  };

  const tableData = [
    ['Pozo', 'Comunidad', 'Estado'],
    ['Pozo Xochitepec', 'Xochitepec', switchValues[0]],
    ['Pozo Cardenas', 'Chinconcuac', switchValues[1]],
    ['Pozo Jaramillo', 'Temixco', switchValues[2]],
  ];

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Control de válvulas</Text>
        <View style={styles.table}>
          {tableData.map((rowData, index) => (
            <View style={styles.row} key={index}>
              {rowData.map((cellData, cellIndex) => (
                <View style={[styles.cell, { width: cellIndex === 2 ? windowWidth * 0.2 : windowWidth * 0.4 }]} key={cellIndex}>
                  {typeof cellData === 'boolean' ? (
                    <CustomSwitch value={cellData} onValueChange={() => handleSwitchChange(index - 1)} />
                  ) : (
                    <Text style={styles.text}>{cellData}</Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Icon name="exclamation-triangle" size={100} color="orange" />
            <Text style={styles.modalText}>{alertText}</Text>
          </View>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={() => closeModal(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'green' }]} onPress={() => closeModal(true)}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Icon name="check-circle" size={100} color="green" />
            <Text style={styles.modalText}>Acción realizada correctamente</Text>
          </View>
          <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'green' }]} onPress={closeSuccessModal}>
            <Text style={styles.modalButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isFailureModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Icon name="times-circle" size={100} color="red" />
            <Text style={styles.modalText}>Acción no realizada</Text>
          </View>
          <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={closeFailureModal}>
            <Text style={styles.modalButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 20 }, 
  title: { fontSize: 40, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  table: { borderWidth: 1, borderColor: '#000', borderRadius: 5, overflow: 'hidden', marginTop: 20 },
  row: { flexDirection: 'row', marginBottom: 10 },
  cell: { flex: 1, marginHorizontal: 5, justifyContent: 'center' },
  text: { textAlign: 'center' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  modalButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  modalButtonText: { fontSize: 16, color: '#fff' },
  alertContainer: { alignItems: 'center' },
});

export default Valvulas;