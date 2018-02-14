import * as Expo from 'expo';
import React from 'react';
import {StatusBar, Platform, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Icon} from 'native-base';
import {Provider} from 'react-redux';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import Main from './components/Main';
import CameraTest from './components/CameraTest';
import Calorie from './components/Calorie';
import Store from './components/Store';
import GetInfo from './components/getInfo';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Addcalorie from './components/Addcalorie';
import FirstScreen from './components/FirstScreen';

const DrawerButton = (props) => {
	return (
    <View style={{paddingLeft:20}}>
      <TouchableOpacity onPress={() => {props.navigation.navigate('DrawerOpen')}}>
        <Icon name='menu'/>
      </TouchableOpacity>
    </View>
  );
};

const Stacknavigation=StackNavigator(
  {
    Home:{
      screen:Main,
      navigationOptions:({navigation}) => ({ 
        headerStyle:{
          backgroundColor:'#66b169', 
        },
        headerTitleStyle: {
          alignSelf: 'center',
          fontSize: 28,
          color:'rgba(0,0,0,0.7)',
        },
        title: 'SnapDiet',  
        //<View> <Image source={require("/components/Resources/Icons/flour.png")} resizeMode="contain" /> </View>
        //headerLeft:<DrawerButton navigation={navigation}/>
      })
    },
    Calorie:{
      screen:Calorie,
      navigationOptions:({navigation}) => ({
        title:'Calorie',
        headerStyle:{
          backgroundColor:'#66b169',
          color:'rgba(0,0,0,0.7)',
        },
      })
    },
    Addcalorie:{
      screen:Addcalorie,
      navigationOptions:({navigation}) => ({
        title:'Add Food',
        headerStyle:{
          backgroundColor:'#66b169',
          color:'rgba(0,0,0,0.7)',
        },
      })
    },
    GetInfo:{
      screen:GetInfo,
      navigationOptions:({navigation}) => ({
        title:'Personal Details',
        headerStyle:{
          backgroundColor:'#66b169',
          color:'rgba(0,0,0,0.7)',
        },
      })
    },
  }
);

const Drawernavigation=DrawerNavigator(
  {
    Home:{screen:Stacknavigation},
    Login:{screen:Login},
    GetInfo:{screen:GetInfo},
    FirstScreen:{screen:FirstScreen}
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: ({navigation}) => <Sidebar navigation={navigation}/>
  }
);

export default class App extends React.Component {
  state = { fontsAreLoaded: false };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      'openSans':require('./OpenSans-Regular.ttf'),
      'openSans-bold':require('./OpenSans-Bold.ttf')
    });
    this.setState({fontsAreLoaded: true});
  }

  render() {
    if (this.state.fontsAreLoaded)
      return <Provider store={Store}><Drawernavigation/></Provider>;
    else
      return <Expo.AppLoading/>;
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:'rgb(255,252,0)',
    height:50,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingTop:Platform.OS=='ios'?0:StatusBar.currentHeight
  }
});


//paddingTop:Platform.OS=='ios'?0:StatusBar.currentHeight <--Use inside tabBarOptions.style if statusbar overlaps tabs