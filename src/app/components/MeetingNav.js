import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

export default class MeetingNav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    goToSettings = () => {
        //this.props.navigation.navigate("Settings")
        //console.log('settings...');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.buttonOne}
                    onPress={this.props.buttonOnePress}
                >
                    <Text style={styles.buttonText}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonTwo}
                    onPress={this.props.buttonTwoPress}
                >
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: colors.app_white,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: "bold",
        color: colors.app_black,
        fontFamily: 'Raleway-Bold',
        textAlign: "center",
    },
    buttonOne:{
        height: 65,
        flex: 0.5,
        alignContent: "center",
        justifyContent: "center",
        borderBottomColor: colors.app_black,
        borderBottomWidth: 3,
    },
    buttonTwo:{
        height: 65,
        flex: 0.5,
        alignContent: "center",
        justifyContent: "center"
    }
})
