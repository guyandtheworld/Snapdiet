import * as Expo from 'expo';
import React from 'react';
import {Provider} from 'react-redux';
import {TabNavigator} from 'react-navigation';
import Main from './Main';
import CameraTest from './CameraTest';
import Calorie from './Calorie';
import Store from './Store';
import GetInfo from './getInfo';

const Tabnavigation=TabNavigator(
  {
    Home:{screen:Main},
    Camera:{screen:CameraTest},
    Calorie:{screen:Calorie},
    Info:{screen:GetInfo}
  },
  {
    tabBarOptions:{
      style:{
        backgroundColor:'rgb(50,50,50)'
      },
      labelStyle:{
        color:'rgba(255,255,255,0.7)'
      },
      indicatorStyle:{
        backgroundColor:'rgb(10,220,220)'
      },
      activeTintColor:'rgb(10,220,220)',
      inactiveTintColor:'rgba(255,255,255,0.7)'
    }
  }
);

export default class App extends React.Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({fontsAreLoaded: true});
  }

  render() {
    if (this.state.fontsAreLoaded)
      return <Provider store={Store}><Tabnavigation/></Provider>;
    else
      return <Expo.AppLoading/>;
  }
}