import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Config from 'react-native-config';
import axios from "axios";

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
      }

    login = () => {
        console.log(Config.API_URL);
        axios.post(env.API_URL + "/signIn",{
            email: this.state.email,
	        password: this.state.password
        })
        .then((response)=>{
            this.props.navigation.navigate("App")
        })
        .catch(error => {
            alert('De combinatie van gebruikersnaam en wachtwoord is incorrect.')
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.formView} >
                        <Text style={styles.formLabel} >Email</Text>
                        <TextInput
                            style={styles.textInputName}
                            placeholder='Voer uw email in'
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                        />
                        <Text style={styles.formLabel} >Wachtwoord</Text>
                        <TextInput
                            style={styles.textInputPw}
                            placeholder='Voer uw wachtwoord in'
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                        <View style={{ margin: 7 }} />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.login}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Aanmelden</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

LoginScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    formView: {
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
       ...GlobalStyles.H1,
       paddingTop: 150,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 30,
        color: colors.app_black,
    },
    textInputName: {
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.app_black,
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 16,
        color: colors.app_black,
    },
    textInputPw:{
        borderBottomWidth: 1,
        borderBottomColor: colors.app_black,
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 16,
        color: colors.app_black,
    },
    button: {
        backgroundColor: colors.app_primary,
        alignSelf: 'stretch',
    },
    buttonText: {
        color: colors.app_white,
        textAlign: 'center',
        fontWeight: "bold",
        paddingTop: 22,
        paddingBottom: 22,
        fontSize: 18,
        textTransform: "uppercase"
    }
});
