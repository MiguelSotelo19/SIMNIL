import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../elements/Header';

Estadistica =()=>{
    return(
        <View style={styles.container}>
        <Header />    
      </View>

    );
}
export default Estadistica;

const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
  });