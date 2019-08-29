import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default class Toggle extends Component {
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
            <View>
                {
                    this.state.on && this.props.children
                }
                <Button onPress={()=>this.toggle()} title="show - hide"/>
            </View>
        )
    }
}
