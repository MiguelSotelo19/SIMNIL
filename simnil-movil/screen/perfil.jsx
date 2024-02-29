import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../elements/Header';
import {TabNav} from '../elements/TabNav'


 Perfil = () => {
    return (
        <View style={styles.container}>
            <Header />  
            <View style={styles.tabContainer}>  
            </View>
        </View>
    );
}

export default Perfil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20, //Ajusta según sea necesario
    },
    tabContainer: {
        flex: 1,
        width: '100%',
    },
    
});
