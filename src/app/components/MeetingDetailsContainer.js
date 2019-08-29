import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Style
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class MeetingDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.row}>
                    <Feather style={styles.icon} name="hash" size={24} color={colors.app_black} />
                    <Text style={GlobalStyles.p}>{this.props.meeting.title}</Text>
                </View>
                <View style={styles.row}>
                    <Feather style={styles.icon} name="calendar" size={24} color={colors.app_black} />
                    <Text style={GlobalStyles.p}>{this.props.meeting.date}</Text>
                </View>
                <View style={styles.row}>
                    <Feather style={styles.icon} name="clock" size={24} color={colors.app_black} />
                    <Text style={GlobalStyles.p}>Van {this.props.meeting.startTime.substring(0, 5)} tot {this.props.meeting.EndTime.substring(0, 5)}</Text>
                </View>
                <View style={styles.row}>
                    <Feather style={styles.icon} name="map-pin" size={24} color={colors.app_black} />
                    <Text style={GlobalStyles.p}>{this.props.meeting.room}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    row:{
        flexDirection: "row"
    },
    icon:{
        marginRight: 15,
        marginBottom: 30
    }
    
})
