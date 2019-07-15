/** Import modules **/
import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, Picker } from 'react-native'
import Modal from 'react-native-modal'

/** Components **/
import styles from './style'

/**
 * Create a modal to select size and quantity
 *
 * @param {*} props
 * @returns
 */
export class YearPicker extends Component {
  /**
   *Creates an instance of YearPicker.
   * @param {*} props
   * @memberof YearPicker
   */
  constructor(props) {
    super(props)
    let startYear = 2010
    let endYear = 2019
    let years = this._getYears(startYear, endYear)
    this.state = {
      backdropOpacity: 0.7,
      animationIn: 'slideInUp',
      isVisible: false,
      save: false,
      startYear: startYear,
      endYear: endYear,
      years: years,
      selectedYear: null,
      callBackClose: null,
    }
  }

  /**
   * Pass ref to View
   *
   * @memberof YearPicker
   */
  componentDidMount() {
    this.props.onRef(this)
  }

  /**
   * Pass ref to View
   *
   * @memberof YearPicker
   */
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  /**
   * Open alert
   *
   * @memberof YearPicker
   */
  openYearPicker = (selectedYear, callBackClose) => {
    this.setState({
      isVisible: true,
      save: false,
      selectedYear: selectedYear ? selectedYear : 2019,
      callBackClose: callBackClose ? callBackClose : () => {},
    })
  }

  /**
   * Close alert
   *
   * @memberof YearPicker
   */
  closeYearPicker = save => {
    this.setState({
      isVisible: false,
      save: save,
    })
  }

  /**
   * Function to get years
   *
   * @memberof YearPicker
   */
  _getYears = (startYear, endYear) => {
    let years = []
    for (let i = startYear; i <= endYear; i++) {
      years.push(i)
    }
    return years
  }

  /**
   * Function to render items in picker
   *
   * @memberof YearPicker
   */
  _renderPickerItems = data =>
    data.map((value, index) => {
      return <Picker.Item key={'r-' + index} label={'' + value} value={value} />
    })

  /**
   * Render Modal
   *
   * @returns
   * @memberof YearPicker
   */
  render() {
    return (
      <Modal
        backdropOpacity={this.state.backdropOpacity}
        animationIn={this.state.animationIn}
        isVisible={this.state.isVisible}
        onModalHide={() => this.state.save && this.state.callBackClose(this.state.selectedYear)}
        onRequestClose={() => this.closeYearPicker()}
        style={styles.modal}
      >
        <TouchableWithoutFeedback onPress={() => this.closeYearPicker()}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.container}>
                <View style={styles.toolBar}>
                  <TouchableOpacity style={styles.toolBarButton} onPress={() => this.closeYearPicker()}>
                    <Text style={styles.toolBarButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity style={styles.toolBarButton} onPress={() => this.closeYearPicker(true)}>
                    <Text style={styles.toolBarButtonText}>Ok</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.innerContainer}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.selectedYear}
                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}
                    mode="dropdown"
                  >
                    {this._renderPickerItems(this.state.years)}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

/** Export component YearPicker **/
export default YearPicker
