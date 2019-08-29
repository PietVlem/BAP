import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class BackArrowHeader extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={this.props.goBack}
            >
                <FontAwesome name="long-arrow-left" size={33} color={colors.app_primary} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginBottom: 50,
    },
    icon: {
        
    },
})
