import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

export default class FaciletyRow extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <TouchableOpacity style={styles.row}>
                <View style={styles.iconContainer}>
                    <Feather style={styles.icon} name="settings" size={33} color={colors.app_black} />
                </View>
                <Text style={styles.text}>123</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    row:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "yellow",
        flexDirection: "row",
    },
    iconContainer:{
        marginRight: 15,
        padding: 10,
        backgroundColor: "red",
        borderRadius: 100,
    },
    icon:{
        
    },
    text:{
        fontSize: 20,
        fontFamily: 'Raleway-Regular'
    }
})
