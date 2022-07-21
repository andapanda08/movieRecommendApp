import React, {Component} from "react"
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native"
import {Header, AirbnbRating, Icon} from "react-native-elements"
import {RFValue} from "react-native-responsive-fontsize"
import axios from "axios"

export default class Homescreen extends Component{
    constructor(){
        super()
        this.state={
            movieDetails:{ }
        }
    }
    componentDidMount(){
        this.getMovie()
    }
    timeConvert(num){
        var Hours=Math.floor(num/60)
        var Minutes=num%60
        return `${Hours} hrs ${Minutes} mins`
    }
    getMovie=()=>{
        const url="http://127.0.0.1:5000/get-movie"
        axios.get(url).then(response=>{
            let details=response.data.data
            details["duration"]=this.timeConvert(details.duration)
            this.setState({movieDetails:details})
        }).catch(error=>{
            console.log(error.message)
        })
    }
    likedMovie=()=>{
        const url="http://127.0.0.1:5000/liked-movie"
        axios.post(url).then(response=>{
            this.getMovie()
        }).catch(error=>{
            console.log(error.message)
        })
    }
    unlikedMovie=()=>{
        const url="http://127.0.0.1:5000/unliked-movie"
        axios.post(url).then(response=>{
            this.getMovie()
        }).catch(error=>{
            console.log(error.message)
        })
    }
    notWatched=()=>{
        const url="http://127.0.0.1:5000/did-not-watch"
        axios.post(url).then(response=>{
            this.getMovie()
        }).catch(error=>{
            console.log(error.message)
        })
    }

    render(){
        const {movieDetails}=this.state
        if(movieDetails.poster_link){
            const {poster_link, title, release_date, duration, overview, rating}=movieDetails
        }
        return(
            <View style={styles.container}>
                <View style={styles.subtopcontainer}>
                    <Image style={styles.posterImage} source={{uri:poster_link}}></Image>
                </View>

                <View style={styles.subbottomcontainer}>

                    <View style={styles.upperbottomcontainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{`${ release_date.split("-")[0] } | ${duration}`}</Text>
                    </View>

                    <View style={middlebottomcontainer}>
                        <AirbnbRating
                        count={10}
                        reviews={[" ", " ", " ", " "]}
                        defaultRating={rating}
                        isDisabled={true}
                        startContainerStyle={{marginTop:-30}}
                        size={RFValue(25)}
                        />
                    </View>

                    <View style={{flex:0.7, padding:15}}>
                        <Text style={styles.overview}>{overview}</Text>
                    </View>

                    <View style={styles.lowerbottomcontainer}>
                        <View style={styles.iconbuttoncontainer}>
                            <TouchableOpacity 
                            onPress={this.likedMovie}
                            >
                                <Icon reverse
                                name={"check"}
                                type={"entypo"}
                                size={RFValue(30)}
                                color={"lightgreen"}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={this.unlikedMovie}
                            >
                                <Icon reverse
                                name={"cross"}
                                type={"entypo"}
                                size={RFValue(30)}
                                color={"red"}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button}
                            onPress={this.notWatched}
                            >
                                <Text style={styles.buttontext}>Did Not Watch</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    

}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
      fontWeight: "300"
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
  });