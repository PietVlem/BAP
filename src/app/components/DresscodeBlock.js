import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class DresscodeBlock extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons style={styles.icon} name="tshirt-crew-outline" size={33} color={colors.app_white}/>
                <Text style={styles.dresscodeTitle} >Dresscode:</Text>
                <Text style={styles.dresscodeText}>Casual</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.app_primary,
        padding: 20,
        shadowOffset: { width: 2, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        borderRadius: 5,
        flex: 1, 
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 30,
    },
    icon:{
        paddingRight: 20,
    },  
    dresscodeTitle:{
        fontFamily: "Raleway-Bold",
        fontSize: 20,
        color: colors.app_white,
        paddingRight: 4,
    },
    dresscodeText:{
        fontFamily: "Raleway-Regular",
        fontSize: 20,
        color: colors.app_white
    }

})
