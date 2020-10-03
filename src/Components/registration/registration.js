import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

export default class Registration extends React.Component {
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            container: {
                borderRadius: 11,
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 15,
                marginBottom: 17 
            },
            text: {
                fontSize: 25,
                paddingRight: 9
            },
            bigText: {
                fontSize: 30,
                fontWeight: "bold",
                paddingRight: 9
            }
        });

        this.state = {
            date: '',
            personal1: '',
            personal2: ''
        }
        this.previousResponse = '';
    }
     
    
    componentDidUpdate() {
        this.eventsRequest()
            .then((response) => {
                if(JSON.stringify(response) !== this.previousResponse){
                    this.getRegistrations(response);
                }
                this.previousResponse = JSON.stringify(response);
        });
    }

    
    async eventsRequest(){
        let response = await fetch(
            'http://185.234.72.120:18000/getRegistration',
        );
        let responseJson = await response.json();
        return responseJson;
    }


    getRegistrations(jsonResponse) {
        this.setState({
            date: jsonResponse[0].date,
            personal1: jsonResponse[0].person1,
            personal2: jsonResponse[0].person2
        });
    }

    render(){
        return (
            <View style={this.styles.container}>
                <Text style={this.styles.text}>Anmeldung am </Text>
                <Text style={this.styles.bigText}>{this.state.date}</Text>
                <Text style={this.styles.text}>ist bei </Text>
                <Text style={this.styles.bigText}>{this.state.personal1}</Text>
                <Text style={this.styles.text}>oder bei </Text>
                <Text style={this.styles.bigText}>{this.state.personal2}</Text>
            </View>
        );
    }
}
