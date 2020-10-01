import React from 'react';
import { render } from 'react-dom';
import { 
    StyleSheet, 
    Image,
    View,
    ScrollView,
    StatusBar,
    RefreshControl,
    Text
} from 'react-native';
import Event from './Components/event';
import Timetable from './Components/timetable';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventResponse: '',
            timetableResponse: '',
            refreshing: false
        };


        StatusBar.setBackgroundColor('#101115', true);
        StatusBar.setBarStyle('light-content');


        this.styles = StyleSheet.create({
            element: {
                marginTop: 50,
                width: '90%',
                backgroundColor: '#DFDFDF',
                borderRadius: 11,
                alignItems: 'center',
            },

            bigContainer: {
                height: '100%',
                width: '100%',
                marginTop: StatusBar.currentHeight,
            },

            logo: {
                position: 'absolute',
                top: 30,
                left: 20,
                height: 80,
                resizeMode: 'contain',
            },

            header: {
                width: '100%',
                height: 100,
                backgroundColor: '#101115',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            },

            container: {
                flexGrow: 1,
                alignItems: 'center',
            }
        });
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getEvents().then((response) => {
            this.setState({refreshing: false, eventResponse: response});
        });
        this.getTimetable().then((response) => {
            this.setState({refreshing: false, timetableResponse: response});
        });
    }

    async getEvents(){
        let response = await fetch(
            'http://185.234.72.120:18000/getEvents',
        );
        let responseJson = await response.json();
        return responseJson;
    }

    async getTimetable(){
        const dateDay = (new Date()).getDay()-1;
        const packet = {};
        packet['day'] = dateDay.toString();
        let response = await fetch(
            'http://185.234.72.120:18000/todaysTimetable',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(packet)
            }
        );
        let responseJson = await response.json();
        return responseJson;
    }

    render() {
        // Generate event Components
        let eventElements = [];
        for(let i = 0; i < this.state.eventResponse.length; i++){
            eventElements.push(<Event key={i} event={this.state.eventResponse[i].text}></Event>);
        }
        // Display error if no Events found
        if(eventElements.length === 0){
            eventElements[0] = <Text key={0} style={{fontSize: 30}}>Keine Events</Text>;
        }

        return (
            <View style={this.styles.bigContainer}>
                <ScrollView contentContainerStyle={this.styles.container} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl> }>
                    <View style={this.styles.header} />
                    <View style={this.styles.element}>
                        <Text style={{fontSize: 40, marginBottom: 10}} >Events</Text>
                        {eventElements}
                    </View>
                    <View style={this.styles.element}>
                        <Text style={{fontSize: 40, marginBottom: 10}} >Programm</Text>
                        <Timetable timetable={this.state.timetableResponse}/>
                    </View>
                    <View style={this.styles.element} />
                    <View style={this.styles.element} />
                    <View style={this.styles.element} />
                    <View style={this.styles.element} />
                    <View style={this.styles.element} />
                </ScrollView>
                <Image 
                    style={this.styles.logo}
                    source={require('./assets/logo.png')} 
                />
            </View>
        );
    };

}