import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-web';

export const SideMenu = () => {
    return(
    <View style={styles.izq}></View>
    );
}


const styles = StyleSheet.create({
    izq: {
        width: '20vw',
        height: '100vw',
        backgroundColor: '#D6EAF8',
        alignSelf: 'flex-start'
    }
});