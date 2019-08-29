import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

// styles
import GlobalStyles from '../constants/style';
import colors from '../constants/Colors';

// Components
import BackArrowHeader from '../components/BackArrowHeader';
import NewsBlockFull from '../components/NewsBlockFull';

export default class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    navigate = (screen) => {
        this.props.navigation.navigate(screen);
    }

    openItem = () =>{
        console.log('newsitem clicked')
    }

    render() {
        const { navigation } = this.props;
        const news = navigation.getParam('news', '');
        const currentItem = navigation.getParam('itemPressed', '');

        console.log(news+" , "+currentItem);

        let newsList = news.map((newsItem)=>{
            return(
                <View key={newsItem.id}>
                    <NewsBlockFull ViewItem={() => this.openItem()} newsDetails={newsItem}/>
                </View>
            )
        })

        return (
            <View style={styles.container}>
                <BackArrowHeader goBack={() => this.navigate("Home")}/>
                <Text style={GlobalStyles.H1}>Nieuws</Text>
                <ScrollView>
                    {newsList}
                </ScrollView>
            </View>
        )
    }
}

NewsScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    
});
