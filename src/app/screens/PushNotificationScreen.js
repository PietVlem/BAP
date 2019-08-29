import React, { Component } from 'react'
import { Text, View, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native'

// Components
import BackArrowHeader from '../components/BackArrowHeader';
import PNSwitch from '../components/PNSwitch';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

export default class PushNotificationScreen extends Component {
    navigate = (screen) => {
        this.props.navigation.navigate(screen)
    }

    render() {
        return (
            <View style={styles.container}>
                <BackArrowHeader goBack={() => this.navigate("Settings")} />
                <Text style={GlobalStyles.H1}>Push Notificaties</Text>
                <Text style={styles.subTitle}>Instellingen</Text>
                <ScrollView style={styles.settingList}>
                    <View style={styles.setting}>
                        <Text style={styles.settingText}>Nieuwe Meetings</Text>
                        <PNSwitch style={styles.settingSwitch} />
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingText}>Veranderingen meeting</Text>
                        <PNSwitch style={styles.settingSwitch} />
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingText}>Chatberichten</Text>
                        <PNSwitch style={styles.settingSwitch} />
                    </View>
                    <View style={styles.setting}>
                        <Text style={styles.settingText}>Herinnering meeting</Text>
                        <PNSwitch style={styles.settingSwitch} />
                    </View>
                    <TouchableOpacity style={styles.timeBeforeMeeting}>
                        <Text style={GlobalStyles.p}>Tijd vooraf herinnering</Text>
                        <View>
                            <Text style={styles.time}>10 minuten</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        )
    }
}

PushNotificationScreen.navigationOptions = {
    header: null
  };

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    subTitle: {
        ...GlobalStyles.H3,
    },
    settingList: {
        marginTop: 20,
    },
    setting: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15,
    },
    settingText: {
        ...GlobalStyles.p
    },
    settingSwitch: {},
    timeBeforeMeeting: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15,
        borderTopColor: colors.app_darkGrey,
        borderBottomColor: colors.app_darkGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    time: {
        ...GlobalStyles.H3,
        color: colors.app_primary,
    }
})
