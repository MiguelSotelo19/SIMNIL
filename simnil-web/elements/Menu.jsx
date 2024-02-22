import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-web';

export const Menu = () => {
    return(
        <View style={styles.menu}>
            <Image style={styles.imagen} source={{uri: '../src/assets/LogoSimnil.png'}} />
            <Text style={styles.nombre}>SIMNIL</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        width: '20%',
        backgroundColor: '#D6EAF8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    imagen: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        width: 60,
        height: 60
    },
    nombre: {
        marginTop: 22,
        marginRight: 30,
        fontSize: 20
    }
});