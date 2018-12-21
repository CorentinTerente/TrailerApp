import React, {Component} from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";


export default class DetailsTrailersScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            trailer : undefined,
        }
    }
    componentDidMount(){
       this.setState({
           trailer : this.props.navigation.getParam('trailer')
       })
    }
    render() {

        if(this.state.trailer) {
            return (
                <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.boldFont}>Title: {this.state.trailer.title}</Text>

                    <Image style={styles.imgStyle} source={{uri: this.state.trailer.poster}} />
                    <Text style={styles.boldFont}>Genre :</Text>
                    {this.state.trailer.genre ? this.state.trailer.genre.map((genre) => <Text key={genre}>{genre}</Text>): null}
                    <Text style={styles.boldFont}>Actors :</Text>
                    {this.state.trailer.actors ? this.state.trailer.actors.map((actor) => <Text key={actor}>{actor}</Text>) : null}
                </ScrollView>
            );
        }
      
        return null;
        
    }
}

const styles = StyleSheet.create({
    boldFont: {
        fontWeight: 'bold',
    },
    imgStyle:{
        width: '100%',
        height: 400,
    }
})