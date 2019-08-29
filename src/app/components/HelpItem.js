import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';

// Styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

export default class HelpItem extends Component {
    state = {
        on: false
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }

    render() {
        let key = 0;
        let steps = this.props.details.steps.map((step)=>{
            key++;
            return(
                <Text style={styles.steps} key={key}>{key+'. '+step}</Text>
            )
        })
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.questionContainer}
                    onPress={() => this.toggle()}
                >
                    <Text style={styles.question}>{this.props.details.question}</Text>
                    <View style={styles.iconContainer}>
                        {
                            this.state.on ? <Feather style={styles.iconTwo} name="chevron-up" size={33} color={colors.app_black} /> : <Feather style={styles.iconTwo} name="chevron-down" size={33} color={colors.app_black} />
                        }
                    </View>
                </TouchableOpacity>
                
                    {
                        this.state.on && (
                        <View style={styles.stepsContainer}>
                            {steps}
                        </View>)
                    }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingBottom:25,
        borderBottomColor: colors.app_darkGrey,
        borderBottomWidth: 1,
        marginBottom: 25
    },
    questionContainer:{
        flexDirection: "row",
    },
    question:{
        ...GlobalStyles.H3,
        flex: 0.9
    },
    stepsContainer:{
        paddingTop: 25,
        
    },
    steps:{
        ...GlobalStyles.p,
    }
})