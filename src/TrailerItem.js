import React, {Component} from "react";
import {View,Text, Image, TouchableHighlight} from 'react-native';

export default class TrailerItem extends Component {

    componentDidMount() {
        console.log('ITEM DID MOUNT')
    }


    render(){
        return(
            
            <TouchableHighlight  onPress={() => this.props.onPressItem(this.props.title)}>
                <View style={{
                flex: 1,
                flexDirection: 'row',
                borderColor: 'black',
                borderWidth: 1,
                height: 35
            }}>
                <Image style={{
                    width: 50,
                    height: 50,
                }}
                source={{uri: this.props.posterUrl}}
                />
                <Text>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
           
        )
    }
}
