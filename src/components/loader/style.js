/** Styles to Button **/
import { StyleSheet } from 'react-native'

/** Import constants **/
import Colors from '../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.transparent,
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.transparent,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

/** Export component styles **/
export default styles
