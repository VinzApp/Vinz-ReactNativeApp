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
    }

    render(){


        return (
            <View style={this.styles.container}>
                <Image 
                    style={this.styles.image}
                    source={require('../../assets/warning.png')}
                />
                <Text style={this.styles.text}>{this.props.event}</Text>
            </View>
        );
    }
}