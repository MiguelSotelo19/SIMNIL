
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../elements/Header';
import { Menu } from '../elements/Menu';
import { SideMenu } from '../elements/SideMenu';
import { Body } from '../elements/Body';

export default function App() {
  return (
    <View style={styles.container}>
      <div style={styles.elements}>
        <Menu />
        <Header/>
      </div>

      <View style={{height: '100vw', display: 'flex', flexDirection: 'row'}}>
        <SideMenu />
        <Body />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    backgroundColor: '#fff',
    display: 'flex'
  }, 
  elements: {
    display: 'flex'
  }
});
