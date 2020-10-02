import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';
import Event from './event';

export default class Events extends React.Component {
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            image: {
                resizeMode: 'contain',
                width: 50,
                height: 50,
                marginRight: 10
            },
            container: {
                flexDirection: 'row',
                backgroundColor: 'orange',
                borderRadius: 11,
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 15,
                opacity: 0.7,
                marginBottom: 17 
            },
            text: {
                fontSize: 30,
                paddingTop: 5,
                paddingRight: 9,
                opacity: 1 
            }
        });

        this.state = {
            events: <Text key={0} style={{fontSize: 30}}>Keine Events</Text>
        }
        this.events = <Text key={0} style={{fontSize: 30}}>Keine Events</Text>;
    }
     
    
    componentDidUpdate() {
        this.eventsRequest()
            .then((response) => {
                this.getEvents(response);
        });
        console.log('Events update1');
    }

    
    async eventsRequest(){
        let response = await fetch(
            'http://185.234.72.120:18000/getEvents',
        );
        let responseJson = await response.json();
        return responseJson;
    }


    getEvents(jsonResponse) {
        let eventElements = [];
        for(let i = 0; i < jsonResponse.length; i++){
            eventElements.push(<Event key={i} event={jsonResponse[i].text}></Event>);
        }
        // Display error if no Events found
        if(eventElements.length === 0){
            eventElements[0] = <Text key={0} style={{fontSize: 30}}>Keine Events</Text>;
        }
        //this.setState({events: eventElements});
        this.events = eventElements;
    }

    render(){
        return (
            <View>
                {this.events}
            </View>
        );
    }
}
