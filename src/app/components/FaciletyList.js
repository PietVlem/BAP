import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../constants/Colors';
import axios from 'axios';

import FaciletyRow from './FaciletyRow';

export default class FaciletyList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let facilities = [
            {
                id: 1,
                name: 'Printer',
                iconName: 'printer'
            },
            {
                id: 2,
                name: 'Ontspanningsruimte',
                iconName: 'tv'
            }
        ]

        let facilitieRows = facilities.map((facility) => {
            return(
                <FaciletyRow key={facility.id} facilityDetails={facility} />
            )
        })

        return (
                <View style={styles.container}>
                   {facilitieRows}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.app_white,
        padding: 15,
        margin: 15,
        alignSelf: 'stretch',
        shadowOffset: { width: 0, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
    },
})
