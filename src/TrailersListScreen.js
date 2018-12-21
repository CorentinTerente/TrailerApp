import React from "react";
import { View, Text, FlatList } from "react-native";
import TrailerItem from './TrailerItem';
import {TrailerContext} from './TrailerContext';


export default class TrailersListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trailerList: [],
            loading: true,
        }
       
    }

    componentDidMount() {

    }

    _onPressItem = (title) => {
        const trailer = this.state.trailerList.find((item) => item.title === title);
        trailer && this.props.navigation.navigate('Trailer', { trailer });
    };

    _renderItem = ({ item }) => {
        return (
            <TrailerItem
                onPressItem={this._onPressItem}
                title={item.title}
                posterUrl={item.poster}
            />
        )
    };

    render() {
        return (
            <TrailerContext.Consumer>
                {({getTrailersList}) => (
                   getTrailersList().then((trailers) => this.setState({trailerList: trailers,loading: false})),
                <View>
                    {this.state.loading ? <Text>Loading ...</Text> :
                        <FlatList
                            data={this.state.trailerList}
                            renderItem={this._renderItem}
                            keyExtractor={(item) => item.title}
                        />
                    }
                </View>
                )}
            </TrailerContext.Consumer>
        );
    }
}

