import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import axios from 'axios';

// Components
import BackArrowHeader from '../components/BackArrowHeader';
import HelpItem from '../components/HelpItem';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

export default class HelpCenterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            helpItems: '',
        };
    }

    componentDidMount() {
        setTimeout(() => {
          axios.get(env.API_URL + "/helpCentreItems")
            .then((response) => {
              console.log(response.data)
              this.setState({
                isLoading: false,
                helpItems: response.data
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
        if(this.state.isLoading){
            return (
                <View style={styles.ActivityIndicatorContainer}>
                  <ActivityIndicator size="large" color={colors.app_primary} />
                </View>
              )
        }else{
            let itemList = this.state.helpItems.map((helpItem)=>{
                return(
                    <HelpItem key={helpItem.id} details={helpItem}/>
                )
            })
            return (
            
                <View style={styles.container}>
                    <BackArrowHeader goBack={() => this.navigate("Settings")} />
                    <Text style={GlobalStyles.H1}>Help Center</Text>
                    {itemList}
                </View>
            )
        }
    }
}

HelpCenterScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    ActivityIndicatorContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: "center",
        justifyContent: "center"
      },
      container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
      }
})
