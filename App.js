import { createAppContainer, createStackNavigator } from 'react-navigation'

import Home from './src/screens/Home'
import Camera from './src/screens/Camera'
import Detail from './src/screens/Detail'

const AppNavigator = createStackNavigator({
  Home:{
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  Camera:{
    screen: Camera,
    navigationOptions: {
      title: 'Camera'
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      title: 'Detail'
    }
  }
},{
  initialRouteName:'Home'
})

export default createAppContainer(AppNavigator)