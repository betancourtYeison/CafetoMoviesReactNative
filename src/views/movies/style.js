/** Styles to view **/
import { StyleSheet } from 'react-native'

/** Import Constants **/
import Colors from '../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearPickerButton: {
    marginTop: 20,
    marginRight: 100,
    marginLeft: 100,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenBlue,
  },
  textPicker: {
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.black,
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
    marginRight: 14,
  },
  containerSlider: {
    flex: 1,
    marginTop: 40,
  },
  titleStyle: {
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.greyishBrown,
    textAlign: 'center',
  },
})

/** Export component styles **/
export default styles
