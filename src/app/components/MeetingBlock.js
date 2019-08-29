import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class MeetingBlock extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.goToMeetingDetails}
                style={styles.container}
            >
                <View style={styles.blueBar} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{this.props.meeting.startTime.substring(0, 5)}</Text>
                    <Text style={styles.title}>{this.props.meeting.EndTime.substring(0, 5)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{this.props.meeting.title}</Text>
                    <Text style={GlobalStyles.p}>{this.props.meeting.room}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: colors.app_lightGrey,
        backgroundColor: colors.app_white,
        marginBottom: 12,
        shadowOffset: { width: 2, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        borderRadius: 5,
        flex: 1, flexDirection: 'row'
    },
    blueBar: {
        width: 8,
        backgroundColor: colors.app_primary,
        borderRadius: 5,
    },
    textContainer: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'Raleway-Bold'
    }
})
