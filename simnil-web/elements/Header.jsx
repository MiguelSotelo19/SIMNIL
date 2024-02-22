
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-web';

export const Header = () => {
    return(
        <View style={styles.container}>
            <Image style={styles.imagen} source={{uri: '../src/assets/usuario.png'}}/>
            <Text style={styles.user}>Administrador</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: '#F4F6F7',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    imagen: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        width: 60,
        height: 60
    },
    user: {
        marginTop: 22,
        marginRight: 30,
        fontSize: 20
    }
});