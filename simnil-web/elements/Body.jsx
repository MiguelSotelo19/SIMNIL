import { StyleSheet, View } from 'react-native'
import { Image, Text } from 'react-native-web';

export const Body = () => {
    return(
        <View style={styles.der}></View>
    );
}

const styles = StyleSheet.create({
    der: {
        width: '80vw',
        height: '100vw',
        alignSelf: 'flex-end'
      }
});