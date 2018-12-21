import React, {Component} from "react";
import {AppContainer} from './StackNavigator'
import {TrailerContext} from './TrailerContext';
import {NetInfo, View} from 'react-native';


const Realm = require('realm');

const FilmSchema = {
    name: 'Trailer',
    properties: {
        title: 'string',
        releasedate: 'date',
        studio: 'string',
        poster: 'string',
        location: 'string',
        rating: 'string',
        genre: 'string[]',
        directors: 'string',
        actors: 'string[]',
    }
}

let realmDB;

function openRealmDB (){
    Realm.open({ schema: [FilmSchema] })
    .then((realm) => {
        realmDB = realm;
    })
}
openRealmDB();

export default class ConnectContainer extends Component{
    constructor(props){
        super(props);
        
        this.getTrailersList = () => {
            console.log('GET TRAILERS')
           return new Promise(resolve => { 
            if(this.state.connected){
                fetch('http://192.168.10.213:8080/trailers')
                    .then((response) => response.json())
                    .then((responseJSON) => {
                        this.persistTrailers(responseJSON);
                        console.log('RETURN FROM SERVER')
                        return responseJSON;
                    })
                    .catch(error => console.error(error));
            } else{
              return realmDB.objects('Trailer');
            }
            resolve();
        })
        }

        this.state ={
            connected: undefined,
            trailerList: [],
            getTrailersList: this.getTrailersList
        }
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentDidMount(){
        NetInfo.isConnected.fetch().then((isConnected) =>{
            this.setState({connected: isConnected})
        })
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
          );
    }

    componentWillUnmount(){
        NetInfo.isConnected.removeEventListener('connectionChange',this.handleConnectivityChange);
    }


    handleConnectivityChange(isConnected){
        isConnected ? this.setState({isConnected: true}) : this.setState({isConnected: false})
    }

    persistTrailers(trailerList) {
        realmDB.write(() => {
             console.log('REALM WRITE')
             trailerList.map((item) => {
                 realmDB.create('Trailer', {
                     title: item.title,
                     releasedate: item.releasedate,
                     studio: item.studio,
                     poster: item.poster,
                     location: item.location,
                     rating: item.rating,
                     genre: item.genre,
                     directors: item.directors,
                     actors: item.actors,
                 })
         
             })
         })   
     }

    render(){
        return(
            <View>
                <TrailerContext.Provider value={this.state}>
                    <AppContainer/>
                </TrailerContext.Provider>
            </View>
        )
    }
}