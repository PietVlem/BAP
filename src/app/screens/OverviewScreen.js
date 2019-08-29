import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

// Env variables
import env from '../environment';

// Components
import NotiSettingsBar from '../components/NotiSettingsBar';
import DresscodeBlock from '../components/DresscodeBlock';
import NewsBlock from '../components/NewsBlock';
import MeetingBlock from '../components/MeetingBlock';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// Dummy Data
// import dummyData from '../constants/DummyData';

export default class OverviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      news: [],
      today: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get(env.API_URL + "/newsposts")
        .then((response) => {
          //console.log(response.data)
          this.setState({
            isLoading: false,
            news: response.data
          })
        })
        .catch(error => {
          alert(error)
        });
    }, 3000);
    this.getDate();
  }

  getDate = () => {
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    let yyyy = currentDate.getFullYear();

    currentDate = dd + '-' + mm + '-' + yyyy;
    this.setState({
      today: currentDate
    })
  }

  navigateNews = (screen, newsId) => {
    this.props.navigation.navigate(screen, {
      "news": this.state.news,
      "itemPressed": newsId
    });
  }

  goToSettings = () => {
    this.props.navigation.navigate("AppSettings")
  }

  goToNotifications = () => {
    this.props.navigation.navigate("Notifications")
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.app_primary} />
        </View>
      )
    } else {
      const meetings = [
        {
          "participantIds": [
            "5d5aaf295ee12b1ed6e909e0"
          ],
          "runningOrder": [
            "parsing",
            "PCI",
            "Metal"
          ],
          "_id": "5d5d466a7bc08e76f3cf53a3",
          "title": "Functionality Georgia indigo",
          "date": "2019-08-30",
          "startTime": "14:30:00",
          "EndTime": "16:00:00",
          "room": "room 3",
          "dresscode": "Casual",
          "__v": 0,
          "id": "5d5d466a7bc08e76f3cf53a3",
          "participants": null
        },
        {
          "participantIds": [
            "5d5aaf295ee12b1ed6e909e0"
          ],
          "runningOrder": [
            "actuating",
            "synthesizing",
            "Investment Account"
          ],
          "_id": "5d5d466a7bc08e76f3cf53a2",
          "title": "Bedfordshire Swedish",
          "date": "2019-08-30",
          "startTime": "09:30:00",
          "EndTime": "13:00:00",
          "room": "room 1",
          "dresscode": "Casual",
          "__v": 0,
          "id": "5d5d466a7bc08e76f3cf53a2",
          "participants": null
        },
      ]
      let MeetingList = meetings.map((meeting) => {
        return (
          <MeetingBlock meeting={meeting} key={meeting.id} />
        )
      })
      let newsList = this.state.news.map((newsItem) => {
        return (
          <NewsBlock ViewItem={() => this.navigateNews("News", newsItem.id)} newsDetails={newsItem} key={newsItem.id} />
        )
      })
      return (
        
        <View style={styles.container}>
          
          <NotiSettingsBar goToNotifications={()=>this.goToNotifications()} goToSettings={()=>this.goToSettings()}/>
          <Text style={GlobalStyles.H1}>Overview</Text>
          <ScrollView>
            <View style={styles.newsTitleContainer}>
              <Text style={GlobalStyles.H2}>Nieuws</Text>
              <TouchableOpacity style={styles.arrowContainer}>
                <FontAwesome name="long-arrow-right" size={33} color={colors.app_primary} />
              </TouchableOpacity>
            </View>
            <ScrollView
              scrollEventThrottle={16}
              horizontal={true}
            >
              {newsList}
            </ScrollView>
            <View style={styles.newsTitleContainer}>
              <View>
                <Text style={GlobalStyles.H2}>Vandaag</Text>
                <Text style={styles.subtitleDate}>{this.state.today}</Text>
              </View>
              <TouchableOpacity style={styles.arrowContainer}>
                <FontAwesome name="long-arrow-right" size={33} color={colors.app_primary} />
              </TouchableOpacity>
            </View>
            <DresscodeBlock />
            <View style={styles.meetingTitleContainer}>
              <Text style={GlobalStyles.H3}>Meetings</Text>
            </View>
            {MeetingList}
          </ScrollView>
        </View>
      );
    }
  }
}

OverviewScreen.navigationOptions = {
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  newsTitleContainer: {
    flex: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 25,
  },
  arrowContainer: {
    marginRight: 10,
  },
  subtitleDate: {
    color: colors.app_primary,
    fontFamily: "Raleway-Bold",
    fontSize: 18,
    paddingTop: 5,
  },
  meetingTitleContainer: {
    paddingBottom: 25
  }
});
