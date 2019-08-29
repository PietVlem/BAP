import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class BottomButtonsBlue extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.buttonOne}
                    onPress={this.props.buttonOnePress}
                >
                    <Text style={styles.buttonText}>{this.props.buttonOne}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonTwo}
                    onPress={this.props.buttonTwoPress}
                >
                    <Text style={styles.buttonText}>{this.props.buttonTwo}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
    },
    buttonText:{
        color: colors.app_white,
        textTransform: "uppercase",
        fontSize: 20,
        fontFamily: 'Raleway-Bold',
        textAlign: "center",
    },
    buttonOne:{
        height: 65,
        flex: 0.5,
        backgroundColor: colors.app_primary,
        alignContent: "center",
        justifyContent: "center",
        
    },
    buttonTwo:{
        height: 65,
        flex: 0.5,
        backgroundColor: colors.app_darkBlue,
        alignContent: "center",
        justifyContent: "center"
    }
})
