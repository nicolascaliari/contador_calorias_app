import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from "@rneui/base";
const staticInfo = {
    name: 'Nicolas Caliari',
    uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
}

const Header = () => {

    const { canGoBack, goBack } = useNavigation()

    return (
        <View style={styles.container}>

            {canGoBack() ? (
                <View style={styles.arrowContainer}>
                    <Button
                     icon={<Icon name="arrow-back" size={24} />} 
                     type="clear"
                     onPress={() => goBack()} />
                </View>
            ) : undefined}
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{`Hola ${staticInfo.name}`}</Text>
                <Text style={styles.subtitle}>Bienvenido de nuevo a tu objetivo.</Text>
            </View>

            <View style={styles.rightContainer}>
                <Image style={styles.image} source={{ uri: staticInfo.uri }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
        color: '#808080'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 24
    },
    arrowContainer: {
        marginLeft:-12
    }
})

export default Header;