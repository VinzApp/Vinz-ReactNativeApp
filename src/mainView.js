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
        this.eventResponse = '';
        this.timetableResponse = '';;


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
    componentDidMount(){
        this.onRefresh();
        this.requestInterval = setInterval(() => {
            this.onRefresh();
        }, 60000);
    }

    componentWillUnmount(){
        clearInterval(this.requestInterval);
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({refreshing: false});
    }


    render() {
        return (
            <View style={this.styles.bigContainer}>
                <ScrollView contentContainerStyle={this.styles.container} refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}></RefreshControl> }>
                    <View style={this.styles.header} />
                    <View style={this.styles.element}>
                        <Text style={{fontSize: 40, marginBottom: 10}} >Events</Text>
                        <Events />
                    </View>
                    <View style={this.styles.element}>
                        <Text style={{fontSize: 40, marginBottom: 10}} >Programm</Text>
                        <Timetable />
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