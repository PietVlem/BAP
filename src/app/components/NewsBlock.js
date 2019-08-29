import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';



export default class NewsBlock extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.ViewItem}
            >
                <View style={styles.iconContainer}>
                    <Feather style={styles.icon} name="bell" size={33} color={colors.app_white} />
                </View>
                <Text style={styles.newsTitle}>{this.props.newsDetails.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.app_primary,
        padding: 20,
        shadowOffset: { width: 2, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        borderRadius: 5,
        marginBottom: 30,
        flex: 1,
        flexDirection: 'row',
        width: 330,
        marginRight: 8,
    },
    icon:{
        marginRight: 20,
    },  
    newsTitle:{
        fontSize: 18,
        fontWeight: "bold",
        color: colors.app_white,
        fontFamily: 'Raleway-Bold',
        flex: 1
    }
})
