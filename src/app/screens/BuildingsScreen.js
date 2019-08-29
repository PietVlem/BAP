import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import axios from "axios";

// Components
import NotiSettingsBar from "../components/NotiSettingsBar";
import BuildingBlock from '../components/BuildingBlock';
import FloorBlock from '../components/FloorBlock';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// Env variables
import env from '../environment';

export default class BuildingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      buildings: [],
      floorsBuilding: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get(env.API_URL + "/buildings")
        .then((response) => {
          this.setState({
            isLoading: false,
            buildings: response.data
          })
        })
        .catch(error => {
          console.log(error)
        });
    }, 3000);
  }

  async showFloors(buildingId){
    let floors;
    await axios.get(env.API_URL + '/floors')
      .then((response)=>{
       floors = response.data;
      })
      .catch(error => {
        console.log(error)
      });
      let floorsBuildingArr = [];
      await floors.forEach((floor) => {
        if(floor.building.id == buildingId){
          floorsBuildingArr.push(floor);
        }
      });
      this.setState({
        floorsBuilding: floorsBuildingArr
      })
  }

  navigateFloorPlan(floor){
    this.props.navigation.navigate("Floor", {'floor': floor})
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.ActivityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.app_primary} />
        </View>
      )
    } else {
      let buildingsList = this.state.buildings.map((building)=> {
        return(
          <BuildingBlock key={building.id} buildingDetails={building} showFloors={() => this.showFloors(building.id)}/>
        )
      })
      let floorList = this.state.floorsBuilding.map((floor)=>{
        return(
          <FloorBlock floor={floor} key={floor.id} goToFloorPlan={() => this.navigateFloorPlan(floor)}/>
        )
      })
      return (
        <ScrollView style={styles.container}>
          <View style={styles.BuildingsContainer}>
            <View
              style={styles.header}
            >
              <NotiSettingsBar />
              <Text style={GlobalStyles.H1}>Map</Text>
              <View style={styles.subtitleContainer}>
                <Text style={GlobalStyles.H3}>Gebouwen</Text>
              </View>
            </View>
            {buildingsList}
          </View>
          <View style={styles.floorContainer}>
            {floorList}
          </View>
        </ScrollView>
      );
    }
  }
}

BuildingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  ActivityIndicatorContainer:{
    flex: 1,
    backgroundColor: '#fff',
    alignContent: "center",
    justifyContent: "center"
  },
  header:{
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitleContainer:{
    marginBottom: 20,
  },
  BuildingsContainer: {
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 8, },
    shadowColor: 'black',
    shadowOpacity: 0.04,
  },
  floorContainer:{
    paddingTop: 15, 
  }
})