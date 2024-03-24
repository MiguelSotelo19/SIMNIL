import React, { useEffect, useState } from 'react';
import { View, Text ,TextInput,StyleSheet} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { Header } from '../elements/Header';

const Estadistica = ({ fechaInicio, fechaFin }) => {
  const [historial, setHistorial] = useState([]);
  const [pozos, setPozos] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateFocused, setStartDateFocused] = useState(false);
  const [endDateFocused, setEndDateFocused] = useState(false);

  useEffect(() => {
    getHistorial();
  }, [fechaInicio, fechaFin]);

  const getHistorial = async (value) => {
    const urlPozos = 'http://10.0.2.2:8080/api/simnil/pozos/';
    const response = await axios.get(urlPozos);
    const pozos = response.data.data;
    getPozos(response.data.data);
    renderHisto(pozos, fechaInicio, fechaFin, value);
  }

  const getPozos = async (data) => {
    let pozoAll = [];

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      let pozo = {
        label: element.nombre,
        value: element.idPozo
      }
      pozoAll.push(pozo);
    }
    setPozos(pozoAll);
  }

  const renderHisto = (pozos, fechaInicio, fechaFin, value) => {
    console.log("POZOS")
    let historial = [];

    for (let i = 0; i < pozos.length; i++) {
      const pozo = pozos[i];
      let fechas = [];

      if(pozo.idPozo == value){
        for (let j = 0; j < pozo.datosPozoBeans.length; j++) {
          const datos = pozo.datosPozoBeans[j];
  
          let anio = parseInt(datos.fechaRecopilacion.substr(0, 4), 10);
          let mes = parseInt(datos.fechaRecopilacion.substr(5, 2), 10);
          let dia = parseInt(datos.fechaRecopilacion.substr(8, 2), 10);
          let hora = parseInt(datos.horaRecopilacion.substr(0, 2), 10);
          let minutos = parseInt(datos.horaRecopilacion.substr(3, 2), 10);
          let segundos = parseInt(datos.horaRecopilacion.substr(6, 2), 10);
  
          let fecha = new Date(anio, mes, dia, hora, minutos, segundos);
          let y = datos.nivelAgua;
  
          fechas.push({ x: fecha, y });
        }
  
        fechas.sort((a, b) => a.x - b.x);
  
        if (fechaInicio && fechaInicio !== '') {
          fechas = fechas.filter(item => item.x >= new Date(fechaInicio));
        }
  
        if (fechaFin && fechaFin !== '') {
          fechas = fechas.filter(item => item.x <= new Date(fechaFin));
        }
  
        historial.push({
          name: "Pozo " + pozo.nombre,
          data: fechas
        });
      }
      }
      
      console.log(historial)
    setHistorial(historial);
  }

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setStartDateFocused(false); // Cerrar el selector de fecha
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setEndDateFocused(false); // Cerrar el selector de fecha
  };

  const handleStartDateFocus = () => {
    setStartDateFocused(true);
    setEndDateFocused(false);
  };

  const handleEndDateFocus = () => {
    setEndDateFocused(true);
    setStartDateFocused(false);
  };

  return (
    <View>
      <Header/>
      <RNPickerSelect 
        onValueChange={(value) => {getHistorial(value);}}
        items={pozos}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio (YYYY-MM-DD)"
        value={startDate ? startDate.toISOString().split('T')[0] : ''}
        onFocus={handleStartDateFocus}
      />
      {startDateFocused && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          onClose={() => setStartDateFocused(false)} // Cerrar el selector de fecha
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Fecha de fin (YYYY-MM-DD)"
        value={endDate ? endDate.toISOString().split('T')[0] : ''}
        onFocus={handleEndDateFocus}
      />
      {endDateFocused && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          onClose={() => setEndDateFocused(false)} // Cerrar el selector de fecha
        />
      )}
      {historial.map((datosPozo, index) => (
        <View key={index}>
          <Text>{datosPozo.name}</Text>
          <LineChart
            data={{
              labels: datosPozo.data.map(item => item.x.toISOString()),
              datasets: [
                {
                  data: datosPozo.data.map(item => item.y),
                },
              ],
            }}
            width={400}
            height={200}
            yAxisSuffix="%"
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Estadistica;