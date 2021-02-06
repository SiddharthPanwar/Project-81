import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View , Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import db from '../config'
import firebase from 'firebase'

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userName : '',
            itemName : '',
            description : ''
        }
    }

    addItem=(itemName,description)=>{
        var userName = this.state.userName
        db.collection("exchange_requests").add({
            "username" : userName,
            "item_name" : itemName,
            "description" : description
        })
        this.setState({
            itemName : '',
            description : ''
        })

        return alert(
            'Item ready to exchange',
            '',
            [
                {text : 'OK', onPress : () => {
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        )

    }

    render(){
        return(
            <View style={{flex:1}}>
                <TextInput
                placeholder={"Item Name"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName : text
                    })
                }}
                value={this.state.itemName}
                />
                <TextInput
                placeholder={"Description"}
                multiline={true}
                onChangeText={(text)=>{
                    this.setState({
                        description : text
                    })
                }}
                value={this.state.description}
                />
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.addItem(this.state.itemName,this.state.description)
                }}
                >
                    <Text style={{color:'#ffff',fontSize:18,fontWeight:'bold'}}>
                        Add Item
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, 
} )
