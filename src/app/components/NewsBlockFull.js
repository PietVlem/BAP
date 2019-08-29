import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// styles
import colors from '../constants/Colors';
import GlobalStyles from '../constants/style';

export default class NewsBlock extends Component {
    state={
        on: false
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.titleContainer}
                    onPress={()=> this.toggle()}
                >
                    <View style={styles.iconContainer}>
                        <Feather style={styles.icon} name="bell" size={33} color={colors.app_white} />
                    </View>
                    <Text style={styles.newsTitle}>{this.props.newsDetails.title}</Text>
                    <View style={styles.iconContainer}>
                        {
                            this.state.on ? <Feather style={styles.iconTwo} name="chevron-up" size={33} color={colors.app_white} /> : <Feather style={styles.iconTwo} name="chevron-down" size={33} color={colors.app_white} />
                        }
                    </View>
                </TouchableOpacity>
                {
                    this.state.on && (
                        <Text style={styles.newsText}>{this.props.newsDetails.body}</Text>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 15,
        backgroundColor: colors.app_white,
        shadowOffset: { width: 2, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        borderRadius: 5,
    },
    titleContainer: {
        backgroundColor: colors.app_primary,
        padding: 20,
        shadowOffset: { width: 2, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
    },
    icon:{
        marginRight: 20,
    },  
    iconTwo:{
        marginLeft: 20,
    }, 
    newsTitle:{
        fontSize: 18,
        fontWeight: "bold",
        color: colors.app_white,
        fontFamily: 'Raleway-Bold',
        flex: 1
    },
    newsText:{
        ...GlobalStyles.p,
        padding: 15,
    }
})
