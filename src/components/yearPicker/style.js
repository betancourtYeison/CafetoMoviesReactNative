/** Styles to Button **/
import { StyleSheet, Platform } from 'react-native'

/** Import Constants **/
import Colors from '../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: undefined,
    justifyContent: undefined,
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  container: {
    width: '100%',
    height: 270,
    borderRadius: 4,
    backgroundColor: Colors.white,
    paddingRight: 14,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    paddingLeft: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    borderBottomWidth: 1,
    borderColor: Colors.veryLightPink,
  },
  toolBarButton: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  toolBarButtonText: {
    fontSize: 15,
    color: Colors.black,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
})

/** Export component styles **/
export default styles
