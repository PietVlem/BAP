import React, { Component } from 'react'
import { Text, View, Switch } from 'react-native'

import colors from '../constants/Colors'

export default class PNSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: true
        };
    }

    handleSwitchToggle = () => {
        this.setState({
            switchValue: !this.state.switchValue
        })
    }

    render() {
        return (
            <Switch 
                onValueChange={this.handleSwitchToggle}
                value={this.state.switchValue}
                
                trackColor={colors.app_red}
                ios_backgroundColor={colors.app_red}
                style={{
                    
                }}
            />
        )
    }
}
