import React from 'react';
import { 
    StyleSheet, 
    Image,
    View,
    ScrollView,
    StatusBar,
    RefreshControl,
    Text
} from 'react-native';
import Event from './Components/events/event';
import Events from './Components/events/events';
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
        this.requestInterval = setInterval(() => {
            this.onRefresh(); 
        }, 60000);
    }
    
    componentWillUnmount() {
        clearInterval(this.requestInterval);
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
        // packet['day'] = dateDay.toString();
        packet['day'] = "3";
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
        return (
            <View style={this.styles.bigContainer}>
                <ScrollView contentContainerStyle={this.styles.container} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl> }>
                    <View style={this.styles.header} />
                    <View style={this.styles.element}>
                        <Text style={{fontSize: 40, marginBottom: 10}} >Events</Text>
                        <Events events={this.state.eventResponse}/>
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