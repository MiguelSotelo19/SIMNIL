import { StyleSheet, Text, View, Image} from 'react-native';

export const Header = () => {
    return(
        <View style={styles.header}>
            <Image style={styles.imagen} source={require('../assets/simnil.jpg')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        marginTop: 45,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#85C1E9'
    },
    imagen: {
        width: 90,
        height: 90
    }
});