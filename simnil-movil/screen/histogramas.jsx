import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Header } from '../elements/Header';
import { Dimensions } from "react-native";


const Estadistica = () => {
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ['Satelite', 'jacarandas', 'Temixco', 'Zapata', 'xochitepec'],
    datasets: [
      {
        data: [550, 210, 300, 600, 100],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 35, 90, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            borderColor: '#000000', 
            borderWidth: 2, 
          }}
          bezier
        />
      </View>
    </View>
  );
};

export default Estadistica;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});