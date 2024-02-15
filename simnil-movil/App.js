import { StyleSheet, Text, View } from 'react-native';
import { Header } from './tags/Header';

console.log(Header);

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Open up App.js to start working on your app!</Text>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
});
