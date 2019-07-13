import { combineReducers } from 'redux'
import { nav } from './navigation'
import { movies } from './movies'

export default combineReducers({
  nav,
  movies,
})
