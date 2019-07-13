/** Import modules **/
import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'

/** Components **/
import styles from './style'

/** Import constants **/
import StringsConstants from '../../constants/strings/strings'
import Colors from '../../constants/styles/colors'

/**
 * Create Modal with ActivityIndicator
 *
 * @param {*} props
 * @returns
 */
export class Loader extends Component {
  /**
   *Creates an instance of LoginScreen.
   * @param {*} props
   * @memberof LoginScreen
   */
  constructor(props) {
    super(props)
    this.state = {
      backdropOpacity: 0.7,
      animationIn: 'slideInUp',
      loading: false,
      callBackOpen: null,
      callBackClose: null,
    }
  }

  /**
   * Pass ref to View
   *
   * @memberof Loader
   */
  componentDidMount() {
    this.props.onRef(this)
  }

  /**
   * Pass ref to View
   *
   * @memberof Loader
   */
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  /**
   * Open alert
   *
   * @memberof Loader
   */
  openLoader = callBackOpen => {
    this.setState({
      loading: true,
      callBackOpen: callBackOpen ? callBackOpen : () => {},
    })
  }

  /**
   * Close alert
   *
   * @memberof Loader
   */
  closeLoader = callBackClose => {
    this.setState({
      loading: false,
      callBackClose: callBackClose ? callBackClose : () => {},
    })
  }

  /**
   * Render loader in modal
   *
   * @returns
   * @memberof Loader
   */
  render() {
    return (
      <Modal
        backdropOpacity={this.state.backdropOpacity}
        animationIn={this.state.animationIn}
        isVisible={this.state.loading}
        onModalShow={() => {
          this.state.callBackOpen()
        }}
        onModalHide={() => {
          this.state.callBackClose()
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={this.state.loading} size={StringsConstants.large} color={Colors.greenBlue} />
          </View>
        </View>
      </Modal>
    )
  }
}

/** Export component Loader **/
export default Loader
