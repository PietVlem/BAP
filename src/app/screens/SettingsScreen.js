import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

// Components
import BackArrowHeader from '../components/BackArrowHeader';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get(env.API_URL + "/users/" + "5d5aaf295ee12b1ed6e909e0")
        .then((response) => {
          //console.log(response.data)
          this.setState({
            isLoading: false,
            user: response.data
          })
        })
        .catch(error => {
          alert(error)
        });
    }, 3000);
  }

  navigate = (screen) => {
    this.props.navigation.navigate(screen)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.app_primary} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <BackArrowHeader goBack={() => this.navigate("Home")} />
            <Text style={GlobalStyles.H1}>Instellingen</Text>
            <View style={styles.imageContainer}>
              <View style={styles.BlueBall}>
                <View style={styles.WhiteBall}>
                  <Image
                    style={styles.image}
                    source={{ uri: this.state.user.avatar }}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.editImageContainer}>
                <Feather style={styles.iconImage} name="edit-2" size={33} color={colors.app_black} />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfoContainer}>
              {/* 
                <View style={styles.greyLine} />
              */}
              <Text style={styles.name}>{this.state.user.name}</Text>
              <Text style={styles.function}>{this.state.user.function}</Text>
            </View>
            <View style={styles.optionsList}>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => this.navigate("PushNotifications")}
              >
                <Text style={GlobalStyles.p}>Push Notifications</Text>
                <Feather style={styles.icon} name="bell" size={25} color={colors.app_black} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
              //onPress={}
              >
                <Text style={GlobalStyles.p}>Account</Text>
                <Feather style={styles.icon} name="settings" size={25} color={colors.app_black} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => this.navigate("HelpCenter")}
              >
                <Text style={GlobalStyles.p}>Help centrum</Text>
                <Feather style={styles.icon} name="help-circle" size={25} color={colors.app_black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

SettingsScreen.navigationOptions = {
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
  innerContainer:{
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  imageContainer: {
    alignItems: "center",
    height: 210,
  },
  BlueBall: {
    width: 174,
    height: 174,
    borderRadius: 174 / 2,
    backgroundColor: colors.app_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WhiteBall: {
    width: 164,
    height: 164,
    borderRadius: 164 / 2,
    backgroundColor: colors.app_white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 156,
    height: 156,
    borderRadius: 156 / 2,
  },
  editImageContainer:{
    backgroundColor: colors.app_white,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 70/2,
    position: "relative",
    top: -35,
  },
  userInfoContainer:{
    marginBottom: 40,
  },
  greyLine:{
    borderTopColor: colors.app_darkGrey,
    borderTopWidth: 1,
    zIndex: -1,
    top: 10,
  },
  name:{
    ...GlobalStyles.H3,
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 8,
  },
  function:{
    textAlign: "center",
    fontSize: 17,
    fontFamily: "Raleway-Regular",
    color: colors.app_primary,
    textAlign: "center",
  },
  optionsList: {
    borderTopColor: colors.app_darkGrey,
    borderTopWidth: 1,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: colors.app_darkGrey,
    borderBottomWidth: 1,
  },
  icon:{
    paddingRight: 20,
  },
  logoutContainer: {
    justifyContent: 'flex-end',
    height: 65,
  },
  logoutButton: {
    height: 65,
    backgroundColor: colors.app_red,
    justifyContent: "center",
  },
  logoutText: {
    color: colors.app_white,
    textTransform: "uppercase",
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    textAlign: "center",
  },
})