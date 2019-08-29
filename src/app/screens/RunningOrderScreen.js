import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// Components
import BackArrowHeader from '../components/BackArrowHeader';

export default class RunningOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    navigate = (screen) => {
        this.props.navigation.navigate(screen);
    }

    render() {
        const { navigation } = this.props;
        const meeting = navigation.getParam('meeting', '');
        let key = 0;
        let runnnigOrderList = meeting.runningOrder.map((item) => {
            key++;
            if (key != 3){
                return (
                    <View key={key}>
                        <View style={styles.ROitem}>
                            <View style={styles.ball} />
                            <Text style={GlobalStyles.p}>{item}</Text>
                        </View>
                        <View style={styles.verticalBar} />
                    </View>
                )
            }else{
                return (
                    <View key={key}>
                        <View style={styles.ROitem}>
                            <View style={styles.ball} />
                            <Text style={GlobalStyles.p}>{item}</Text>
                        </View>
                    </View>
                )
            }
            
        })

        return (
            <View style={styles.container}>
                <BackArrowHeader goBack={() => this.navigate('MeetingDetails')} />
                <Text style={GlobalStyles.H1}>Running Order</Text>
                <Text style={GlobalStyles.H3}>Onderwerpen</Text>
                <View style={styles.ROlist}>
                    {runnnigOrderList}
                </View>
            </View>
        );
    }
}

RunningOrderScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    ROlist: {
        paddingTop: 30,
    },
    ROitem: {
        flexDirection: "row",
    },
    ball: {
        width: 24,
        height: 24,
        borderRadius: 24 / 2,
        backgroundColor: colors.app_primary,
        marginRight: 15
    },
    verticalBar: {
        height: 40,
        width: 2,
        marginLeft: 11,
        backgroundColor: colors.app_darkGrey,
    }
})
