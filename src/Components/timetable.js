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
    }
    
    componentDidUpdate() {
        this.getSliceInfo();
    }
    
    getSliceInfo() {
        const d = new Date();
        const currentTime = this.pad(d.getHours(), 2) + ':' + this.pad(d.getMinutes(), 2);
        // If no timetables are found (mostly on Weekends)
        if(this.props.timetable[0] == undefined){
            console.log('No Timetable entries found!');
            return '';
        }
        let i;
        for(i = 0; i < this.props.timetable.length; i++){
            if(currentTime > this.props.timetable[i].starttime && currentTime < this.props.timetable[i].endtime){
                break;
            }
        }
        console.log('test');
        //this.setState({currentSliceEnd: this.props.timetable[i].endtime})
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