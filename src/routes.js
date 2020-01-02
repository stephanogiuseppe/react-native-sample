import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { enableScreens } from 'react-native-screens'

import Main from './pages/Main'
import User from './pages/User'

enableScreens()

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#755599'
        },
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center'
      }
    }
  )
)

export default Routes
