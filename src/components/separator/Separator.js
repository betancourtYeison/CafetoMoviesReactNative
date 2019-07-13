/** Import modules **/
import React, { Component } from 'react'
import { View } from 'react-native'

/**
 * Class to override and create a new TextInput with style
 *
 * @export
 * @class Separator
 *
 * @extends {Component}
 */
export class Separator extends Component {
  /**
   * Render component with Text and TextInput
   *
   * @returns
   * @memberof Separator
   */
  render() {
    return <View style={{ ...this.props.style }} />
  }
}

/** Export component Separator **/
export default Separator
