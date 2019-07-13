import { Platform } from 'react-native'
/** Define object to static labels in app **/
const STRINGS_CONTANTS = {
  nameApp: 'Movies',
  appVersion: '0.0.1',
  exitApp: 'Atención',
  exitAppMessage: 'Está a punto de salir de la aplicación.\n¿Realmente desea salir?',
  cancel: 'Cancelar',
  yes: 'Si',
  no: 'No',
  persistenceKey: 'persistenceKey',
  toast: 'toast',
  alertToast: 'alertToast',
  infoToast: 'infoToast',
  positionToast: Platform.OS === 'ios' ? 'top' : 'bottom',
}

/** Export STRINGS_CONTANTS **/
export default STRINGS_CONTANTS
