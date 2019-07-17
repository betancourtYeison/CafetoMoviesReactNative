/** Import modules **/
import React, { Component } from 'react'
import { BackHandler, Alert, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

/** Import views **/
import MoviesScreen from '../views/movies/MoviesScreen'

/** Import constants **/
import Routes from './../constants/routes/routes'
import StringsConstants from './../constants/strings/strings'

/** Import actions **/
import { backNavigationAction } from './../actions/navigation'

const RootNavigator = createSwitchNavigator(
  {
    MoviesScreen: MoviesScreen,
  },
  {
    initialRouteName: 'MoviesScreen',
  }
)

const AppContainer = createAppContainer(RootNavigator)

const persistenceKey = StringsConstants.persistenceKey

const persistNavigationState = async navState => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
  } catch (err) {
    // handle the error according to your needs
  }
}

const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey)
  return JSON.parse(jsonString)
}

/** create nav component **/
class ReduxNavigation extends Component {
  /**
   * Function to add back handler event to Android
   *
   * @memberof ReduxNavigation
   */
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        StringsConstants.exitApp,
        StringsConstants.exitAppMessage,
        [
          {
            text: StringsConstants.cancel,
            onPress: () => {},
            style: 'cancel',
          },
          { text: StringsConstants.yes, onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      )
      return true
    })
  }

  /**
   * Function to remove back handler event to Android
   *
   * @memberof ReduxNavigation
   */
  componentWillUnmount() {
    this.backHandler.remove()
  }

  /**
   * Remder App Navigation
   *
   * @returns
   * @memberof ReduxNavigation
   */
  render() {
    return <AppContainer persistNavigationState={persistNavigationState} loadNavigationState={loadNavigationState} />
  }
}

const mapDispatchToProps = { backNavigationAction }

const mapStateToProps = state => ({
  nav: state.nav,
})

const AppNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxNavigation)

/** Export component RootNavigator, AppNavigator and middleware **/
export { RootNavigator, AppNavigator }
