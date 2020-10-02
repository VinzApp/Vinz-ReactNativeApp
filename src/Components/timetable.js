import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Timetable extends React.Component {
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            container: {
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
            currentSliceName: '',
            currentSliceEnd: '',
            futureSliceName: '',
            futureSliceStart: '',
            futureSliceEnd: ''
        } 
        this.previousResponse
    }

    componentDidUpdate() {
        this.timetableRequest()
            .then((response) => {
                if(JSON.stringify(response) !== this.previousResponse){
                    this.getTimetable(response);
                }
                this.previousResponse = JSON.stringify(response);
        });
        console.log('Timetable updated');
    }


    async timetableRequest(){
        const dateDay = (new Date()).getDay()-1;
        const packet = {};
        // TODO: remove testing value
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
    

    getTimetable(jsonResponse) {
        const d = new Date();
        const currentTime = this.pad(d.getHours(), 2) + ':' + this.pad(d.getMinutes(), 2);
        // If no timetables are found (mostly on Weekends)
        if(jsonResponse[0] == undefined){
            console.log('No Timetable entries found!');
            return '';
        }
        let i;
        for(i = 0; i < jsonResponse.length; i++){
            if(currentTime > jsonResponse[i].starttime && currentTime < jsonResponse[i].endtime){
                break;
            }
        }

        if(jsonResponse[i+1] != undefined){
            this.setState({
                currentSliceName: jsonResponse[i].name, 
                currentSliceEnd: jsonResponse[i].endtime,
                futureSliceName: jsonResponse[i+1].name, 
                futureSliceStart: jsonResponse[i+1].starttime, 
                futureSliceEnd: jsonResponse[i+1].endtime
            });
        }else{
            this.setState({
                currentSliceName: jsonResponse[i].name, 
                currentSliceEnd: jsonResponse[i].endtime
            });
        }
    }

    pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    render(){
        return (
            <View style={this.styles.container}>
                <Text style={this.styles.text}>Jetzt ist {this.state.currentSliceName} bis {this.state.currentSliceEnd}</Text>
                <Text style={this.styles.text}>Danach ist {this.state.futureSliceName} von {this.state.futureSliceStart} bis {this.state.futureSliceEnd}</Text>
            </View>
        );
    }
}