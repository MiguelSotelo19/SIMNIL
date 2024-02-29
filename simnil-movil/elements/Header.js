import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export const Header = () => {
    return (
        <View style={styles.header}>
            <Image style={styles.imagen} source={require('../assets/logo.png')} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Salir</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Añadido para separar la imagen y el botón
        backgroundColor: '#85C1E9'
    },
    imagen: {
        width: 90,
        height: 90
    },
    button: {
        marginRight: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});
