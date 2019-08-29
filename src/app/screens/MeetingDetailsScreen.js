import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// components
import MeetingDetailsContainer from '../components/MeetingDetailsContainer';
import BackArrowHeader from '../components/BackArrowHeader';
import BottomButtonsBlue from '../components/BottomButtonsBlue';
import MeetingNav from '../components/MeetingNav';

export default class meetingDetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  navigate = (screen) => {
    this.props.navigation.navigate(screen);
  }

  navigateRunningOrder = (data) => {
    this.props.navigation.navigate("RunningOrder", {"meeting":  data});
  }

  render() {
    const { navigation } = this.props;
    const meeting = navigation.getParam('meeting', '');

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <BackArrowHeader goBack={() => this.navigate('Agenda')} />
          <Text style={GlobalStyles.H1}>Details</Text>
          <MeetingNav />
        </View>
        <ScrollView style={styles.detailsContainer}>
          <MeetingDetailsContainer meeting={meeting} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <BottomButtonsBlue buttonTwoPress={() => this.navigateRunningOrder(meeting)} buttonOne="Toon Route" buttonTwo="Running Order" />
        </View>
      </View>
    );
  }
}

meetingDetailsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app_white,
  },
  innerContainer: {
    backgroundColor: colors.app_white,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 8, },
    shadowColor: 'black',
    shadowOpacity: 0.04,
  },
  detailsContainer:{
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    height: 65,
  },
});
