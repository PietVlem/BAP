import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import axios from 'axios';

// Env variables
import env from '../environment';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// Components
import NotiSettingsBar from "../components/NotiSettingsBar";
import MeetingBlock from "../components/MeetingBlock";

export default class AgendaScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      meetings: "",
      meetingDates: "",
      selectedDate: "",
      meetingsToday: [],
    };
  }

  componentWillMount() {
    this.getTodaysDate();

    setTimeout(() => {
      axios.get(env.API_URL + "/meetings")
        .then((response) => {
          this.setState({ 
            meetings: response.data,
            isLoading: false,
          })
          //console.log(response.data);
        }).catch(error => {
          alert(error)
        });
    }, 3000);
  }

  async getTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    await this.setState({ selectedDate: today });
    //console.log(this.state.selectedDate);
  }

  async DaySelected(day) {
    await this.setState({ selectedDate: day.dateString })
    //console.log(this.state.selectedDate);
    this.getMeetings();
  }

  async getMeetings() {
    // Get all Meetings of that day
    let meetingArray = [];

    this.state.meetings.forEach(element => {
      if (element.date == this.state.selectedDate) {
        meetingArray.push(element);
      }
    });
    await this.setState({ meetingsToday: meetingArray })
  }

  goToMeetingDetailPage(meetingDeatils) {
    this.props.navigation.navigate("MeetingDetails", {'meeting': meetingDeatils})
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.app_primary} />
        </View>
      )
    } else {
      let meetingsList;
      let meetingArr = [];
      let newDaysObject = {};
      if (this.state.meetings != "") {
        this.state.meetings.forEach((meeting) => {
          meetingArr.push(meeting.date);
        })
        meetingArr.forEach((day) => {
          newDaysObject[day] = {
            marked: true
          };
        });
        meetingsList = this.state.meetingsToday.map(meetingDetails => {
          return (
            <MeetingBlock key={meetingDetails.id} meeting={meetingDetails} goToMeetingDetails={() => this.goToMeetingDetailPage(meetingDetails)} />
          )
        })
      }
      return (
        <View style={styles.container}>
          <View style={styles.notificationBarFix}>
            <NotiSettingsBar />
          </View>
          <View style={styles.CalenderContainer}>
            <Text style={GlobalStyles.H1}>Agenda</Text>
            <Calendar
              style={styles.calendar}
              onDayPress={(day) => { this.DaySelected(day) }}
              markedDates={newDaysObject}
            />
          </View>
          <View style={styles.meetingsContainer}>
            <Text style={GlobalStyles.H3}>Meetings</Text>
          </View>
          <ScrollView style={styles.meetingsContainer}>
            {meetingsList}
          </ScrollView>
        </View>
      );
    }
  }
}

AgendaScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  ActivityIndicatorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationBarFix:{
    paddingLeft: 20,
    paddingRight: 20,
  },
  CalenderContainer: {
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 8, },
    shadowColor: 'black',
    shadowOpacity: 0.04,
    paddingLeft: 20,
    paddingRight: 20,
  },
  calendar: {
    marginTop: 0,
  },
  meetingsContainer: {
    padding: 20,
  }
});
