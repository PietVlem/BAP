import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

export default class FaciletyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.ShowList}
            >
                <Feather style={styles.icon} name={this.props.iconName} size={33} color={colors.app_white} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        backgroundColor: colors.app_primary,
        borderRadius: 100,
        justifyContent: "center",
    },
    icon:{
        textAlign: 'center'
    }
})
