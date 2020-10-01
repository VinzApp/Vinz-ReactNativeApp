import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

export default class Event extends React.Component {
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            image: {
                resizeMode: 'contain',
                width: 50,
                height: 50,
            },
            container: {
                flexDirection: 'row'
            },
            text: {
                fontSize: 30,
                backgroundColor: 'orange'
            }
        });
    }

    render(){
        return (
            <View style={this.styles.container}>
                <Image 
                    style={this.styles.image}
                    source={require('../assets/warning.png')}
                />
                <Text style={this.styles.text}>{this.props.event}</Text>
            </View>
        );
    }
}