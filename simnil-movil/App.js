import { StyleSheet, Text, View } from 'react-native';
import { Header } from './elements/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
});
