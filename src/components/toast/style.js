/** Styles to Button **/
import { StyleSheet } from 'react-native'

/** Import Constants **/
import Colors from './../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    justifyContent: 'center',
    height: 'auto',
    minHeight: 56,
    paddingTop: 4,
    paddingBottom: 4,
  },
  text: {
    color: Colors.white,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconStyle: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    width: '85%',
    paddingRight: 14,
  },
  containerText: {
    marginLeft: 14,
    marginRight: 14,
  },
  alertToastContainer: {
    backgroundColor: Colors.redBGToast,
    width: '100%',
  },
  alertToastText: {
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.white,
  },
  infoToastContainer: {
    backgroundColor: Colors.greenBlue,
    width: '100%',
  },
  infoToastText: {
    fontSize: 16,
    letterSpacing: 0,
    color: Colors.white,
  },
})

/** Export component styles **/
export default styles
