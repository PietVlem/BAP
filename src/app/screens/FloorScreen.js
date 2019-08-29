import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// components
import BackArrowHeader from '../components/BackArrowHeader';
import FaciletyButton from '../components/FaciletyButton';
import FaciletyList from '../components/FaciletyList';

export default class FloorScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listShown: false,
        };
    }

    goBackToBuildingsScreen = () => {
        this.props.navigation.navigate("Buildings");
    }

    ShowList = () => {
        this.state.listShown === false ? this.setState({listShown: true}) : this.setState({listShown: false})
    }

    render() {
        const { navigation } = this.props;
        const floor = navigation.getParam('floor', '');
        
        return (
            <View style={styles.container}>
                <View style={styles.floorContainer}>
                    <BackArrowHeader goBack={() => this.goBackToBuildingsScreen()} />
                    <Text style={GlobalStyles.H1}>{floor.name}</Text>
                </View>
                <View style={styles.mapContainer}>
                    <BlurView tint="light" intensity={50} style={styles.blur}>
                        <MapView
                            initialRegion={{
                                latitude: Number(floor.building.coords.latitude),
                                longitude: Number(floor.building.coords.longitude),
                                latitudeDelta: 0.0013,
                                longitudeDelta: 0.0013,
                            }}
                            style={styles.map}
                        >
                        </MapView>
                    </BlurView>
                    <View style={styles.floorImageContainer}>
                        <Image
                            style={styles.floorImage}
                            source={{ uri: floor.Floorplan }}
                        />
                    </View>
                    <View style={styles.faciletyButtonContainer}>
                        <FaciletyButton iconName={this.state.listShown ? "x" : "map-pin"} ShowList={this.ShowList} />
                    </View>
                    <View style={styles.faciletyListContainer}>
                        {
                            this.state.listShown ? <FaciletyList style={styles.faciletyListContainer}/> : <Text/>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

FloorScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floorContainer: {
        backgroundColor: colors.app_white,
        shadowOffset: { width: 0, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        paddingLeft: 20,
        paddingRight: 20,
    },
    mapContainer:{
        flex: 1,
    },
    blur: {
        flex: 1,
    },
    map: {
        flex: 1,
        zIndex: -10
    },
    floorImageContainer:{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floorImage:{
        width: 294,
        height: 218,
    },
    faciletyButtonContainer:{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 20,
        right: 0,
        zIndex: 5,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    faciletyListContainer:{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 10,
        flex: 1,
        alignItems: 'center',
    }
});
