import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

export default class NotiSettingsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.notifcations}
                    onPress={this.props.goToNotifications}
                >
                    <Feather name="bell" size={33} color={colors.app_black} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.settings} 
                    onPress={this.props.goToSettings}
                >
                    <Feather name="settings" size={33} color={colors.app_black} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "red",
        marginTop: 80,
        marginBottom: 50,
        paddingLeft: 10,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    notifcations: {
    },
    settings: {
    }
})
