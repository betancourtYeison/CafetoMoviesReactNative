import { SET_MOVIES, SET_SELECTED_YEAR, SET_RATING, CLEAN_MOVIES } from './types'
import { createAction } from 'redux-actions'

export const setMoviesAction = createAction(SET_MOVIES, data => {
  return {
    data,
  }
})

export const setSelectedYearAction = createAction(SET_SELECTED_YEAR, selectedYear => {
  return {
    selectedYear,
  }
})

export const setRatingAction = createAction(SET_RATING, (movie, rating) => {
  return {
    movie,
    rating,
  }
})

export const cleanMoviesAction = createAction(CLEAN_MOVIES)
