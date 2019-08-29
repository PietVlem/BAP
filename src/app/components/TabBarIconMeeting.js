import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIconMeeting(props) {
    return (
        <View style={styles.square}>
            <Feather
                name={props.name}
                size={26}
                style={styles.icon}
                color={Colors.app_white}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    square:{
        width: 60,
        height: 60,
        backgroundColor: Colors.app_primary,
        position: 'absolute',
        top: -15,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
    },
    icon:{
        marginBottom: -15,
        paddingLeft: 17,
        paddingTop: 17
    }
    
})