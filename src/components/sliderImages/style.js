/** Styles to Button **/
import { StyleSheet, Dimensions } from 'react-native'

/** Import Constants **/
import Colors from '../../constants/styles/colors'
const WIDTH = Dimensions.get('window').width

/** Create an object style **/
const styles = StyleSheet.create({
  container: {},
  layoutIndicatorVertical: {
    marginTop: 14,
    top: 0,
    bottom: 0,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  layoutIndicatorHorizontal: {
    marginTop: 14,
    right: 0,
    bottom: 5,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
  },
  indicator: {
    margin: 10,
    opacity: 0.9,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  indicatorSelected: {
    opacity: 1,
  },
  containerImage: {
    flex: 1,
    width: WIDTH,
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: 'black',
  },
  layoutText: {
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  textCaption: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
  },
  walletContainer: {
    height: 190,
    width: WIDTH - 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11.3,
    backgroundColor: Colors.white,
    marginRight: 32,
    marginLeft: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 3,
  },
  walletText: {
    flexDirection: 'row',
  },
  textValue: {
    fontSize: 42,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.black,
  },
  walletContainerRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textPoints: {
    fontSize: 10,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.greenBlue,
  },
  textDecimals: {
    fontSize: 20,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: Colors.black,
  },
  separator: {
    marginTop: 20,
    marginBottom: 14,
    flexDirection: 'row',
    height: 1,
    width: '90%',
    backgroundColor: Colors.veryLightPink,
  },
})

/** Export component styles **/
export default styles
