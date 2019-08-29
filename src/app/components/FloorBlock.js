import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class FloorBlock extends Component {

    onPress = () => {
        this.props.goToFloorPlan();
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.onPress}
            >
                <View style={styles.textContainer}>
                    <Feather style={styles.icon} name="layers" size={20} color={colors.app_black} />
                    <Text style={GlobalStyles.p}>{this.props.floor.name}</Text>
                </View>
                <MaterialIcons style={styles.icon} name="keyboard-arrow-right" size={25} color={colors.app_black} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomColor: colors.app_darkGrey,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    textContainer: {
        flex: 1,
        flexDirection: "row",
    },
    icon: {
        paddingRight: 20,
    },
})
