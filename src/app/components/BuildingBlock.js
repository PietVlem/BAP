import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class Buildingblock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BlockColored: ""
        };
    }

    async onPress(buildingId){
        await this.props.showFloors();
        this.setState({
            BlockColored: buildingId
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.onPress(this.props.buildingDetails.id)}
                style={(this.state.BlockColored === this.props.buildingDetails.id) ? styles.BlockColored : styles.BlockNotColored}
            >
                <View style={styles.buildingContianer}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.props.buildingDetails.image }}
                    />
                    <Text
                        style={GlobalStyles.p}
                    >
                        {this.props.buildingDetails.name}
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <FontAwesome name="long-arrow-right" size={33} color={colors.app_primary} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    BlockColored: {
        backgroundColor: colors.app_lightGrey,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    BlockNotColored: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    buildingContianer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    iconContainer: {
        marginRight: 10,
    },
})
