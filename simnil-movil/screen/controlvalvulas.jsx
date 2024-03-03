import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../elements/Header';

Valvulas =()=>{
    return(
        <View style={styles.container}>
        <Header />    
      </View>

    );
}
export default Valvulas;

const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
  });