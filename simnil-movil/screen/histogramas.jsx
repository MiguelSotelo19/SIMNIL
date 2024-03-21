import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../elements/Header';
import Histograma from '../elements/Histograma';

Estadistica =()=>{
    return(
      <View style={styles.container}>
        <Header />   
        <Histograma /> 
      </View>
    );
}
export default Estadistica;

const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
  });