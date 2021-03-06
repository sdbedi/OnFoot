import React, { Component } from 'react';
import logo from '../logo.svg';
import './css/App.css';


import getRestaurants from './lib/getRestaurants.js'
import getAddress from './lib/getAddress.js'
import getDirections from './lib/getDirections.js'
import getAPI from './lib/getImagesAPI.js'
import isLogin from './lib/isLogin.js'
import getDisplayName from './lib/getDisplayName.js'
import getSaveRestaurant from './lib/getSaveRestaurant.js'


import List from './List';
import Directions from './Directions';
import Loading from './Loading';
import Nav from './Nav'
import SaveRestaurants from './SaveRestaurants'


class App extends Component {
  constructor (props) {
    super()
    this.state = {
      //original value so that its not just undefined
      location: `Getting your location...`,
      latlong:undefined,
      data:undefined,
      showList: false,
      hideButton: false,
      showDirections: false,
      directions: undefined,
      imageAPI:undefined,
      isLogin:false,
      displayName:undefined,
      saveRestaurants: undefined,
      showSaveRestaurants: false
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      }
      else {
      console.log('Geolocation is not supported for this Browser/OS.');
      }
    // Get the user's location:
    if (navigator.geolocation) {
      //use an arrow function to not lose the this binding
      //watchPosition will constantly get the user's location
      navigator.geolocation.watchPosition( (position) => {
        console.log("Success! latitude: ", position.coords.latitude, "longitude:", position.coords.longitude)
        this.setState({latlong:`${position.coords.latitude},${position.coords.longitude}`});
        //passes in the location to start finding restaraunts
        this.getNearbyRestaurants({location:this.state.latlong});
        //getAddress will take our longitude and latitude and find the nearest address to us
        getAddress({latlng:this.state.latlong},((location)=>{
          console.log(location)
          //the location state will update each time this is run
          //split data into variables to increase readability
          var streetNum  = location[0].long_name
          var streetName = location[1].long_name
          //the location state will update each time this is run
          this.setState({location: `Current Location: ${streetNum} ${streetName}`})

        }))
      })
    }
  }
  // get all the restaurants nearby
  getNearbyRestaurants(location){
    getRestaurants(location,(restaurants) => {
      this.setState({data:restaurants});
    })
  }

  showSaveRestaurants(){
    getSaveRestaurant((restaurants)=>{
      console.log("res",restaurants);
      this.setState({saveRestaurants: restaurants});
      this.setState({showSaveRestaurants: true});
    })
  }

  hidSaveRestaurants(){
    this.setState({showSaveRestaurants: false});
  }


  //this waits till you have rendered something to then run anything in here
  componentDidMount() {
    this.getLocation()

   // calls getAPI and returns the environment variable API or deployment config API and
   // sets state to that so we can pass it down
    getAPI((api)=>{
      this.setState({imageAPI:api})

    })

    isLogin((user)=>{
      this.setState({isLogin:user.isLogin});
      this.setState({displayName:user.name});
    })
  }

  //this is for displaying the list, once this function was called it will hide the button
  displayList(){
    this.setState({showList:true});
    this.setState({hideButton:true});
  }

  //this is for displaying the Direction component, this needs to be called when a restaurant has been clicked
  // we pass the desired destination Lat & Long, and the id; id corresponds to the Google maps JSON object id
  displayDirections(destinationLatLng, id, e) {
    var location = {origin:this.state.latlong, destination: destinationLatLng};

    getDirections(location,(steps) => {
      //get all data needed then replace the current display to a direction component
      this.setState({directions:steps});
      // this.setState({showList:false});
      // this.setState({showDirections:true});

      // we get an array with the results back from the Google API; that's what we're accessing
      var data=this.state.data.results;

      // Take a deep breath...
      // get the directions out of the JSON object and onto the page
      var directionSteps = steps.routes[0].legs[0].steps
        // map over the array we get back for the html_instructions, and then
        // strip out the html tags that the Google Maps directions object returns
        .map(x=>x.html_instructions.replace(/<(?:.|\n)*?>/gm, ' '))


      // look up the item in our state by state.id and
      // set a directions property equal to the "steps" from Google's directions
      // (with quadratic time complexity :) )
      data[data.map(x => x.id).indexOf(id)]['directions'] = directionSteps;

      // In order to get the directions to display in each "card", we had to use forceUpdate.
      // There's probably a better way to handle this...
      this.forceUpdate();
      console.log('Here are the steps results for the place you just clicked', steps);
    })
  }

  render() {
    //set to a variable for a little better readability
    var location = this.state.location
    var data = this.state.data
    var api = this.state.imageAPI
    var isLogin = this.state.isLogin
    return (
      <div className="App">

        {
          <Nav isLogin={isLogin} displayName={this.state.displayName} showSaveRestaurants={() => this.showSaveRestaurants()}/>
        }

        {/*We're accepting this button's state from the root state, so we can keep our button inside of our Loading component*/}
        <Loading location={location} hideButton={this.state.hideButton} displayList={() => this.displayList()}/>
        {
          //check if showList is true then call the List component
          this.state.showList ?
          <List data={data} API={api} isLogin={isLogin} showDirections={this.state.showDirections} displayDirections={this.displayDirections.bind(this)}/> : null
        }

        {
          //check if showDirections is true then call the Directions component
          this.state.showDirections ?
           <Directions directions={this.state.directions}/> : null
        }

        {
          this.state.showSaveRestaurants ?
          <SaveRestaurants data = {this.state.saveRestaurants} hidSaveRestaurants = {() => this.hidSaveRestaurants()}/> : null
        }

      </div>
    )
  }
}

export default App;
