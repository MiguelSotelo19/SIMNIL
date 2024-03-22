import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        
        navigation.navigate('Login');
    };
    return (
        <View style={styles.header}>
            <Image style={styles.imagen} source={require('../assets/logo.png')} />
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} />
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
        backgroundColor: '#85C1E9',
        marginTop:30
    },
    imagen: {
        width: 90,
        height: 90
    },
    button: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor:'#FFFFFF'
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5, 
        
    },
    icon: {
        color: 'black',
        fontSize: 16,
    }
});