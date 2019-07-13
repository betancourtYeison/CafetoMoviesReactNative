/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

/** Import configStore **/
import configStore from './src/store'

/** Import navigator **/
import { AppNavigator } from './src/navigators/AppNavigator'

const { store, persistor } = configStore()

/**
 * Create and export main app
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * Function to remove status bar
   *
   * @memberof App
   */
  componentWillMount() {
    StatusBar.setHidden(true)
  }
  /**
   * Render main app
   *
   * @returns
   * @memberof App
   */
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

/** Export App **/
export default App
