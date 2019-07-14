/** Import modules **/
import { handleActions } from 'redux-actions'
import { SET_MOVIES, SET_SELECTED_YEAR, SET_RATING, CLEAN_MOVIES } from './../actions/types'

export const movies = handleActions(
  {
    [SET_MOVIES]: (state, action) => {
      const { data } = action.payload
      let nextState = null
      if (data.results.length > 0) {
        nextState = {
          ...state,
          selectedYear: data.selectedYear,
          [data.selectedYear]: data.results.map((item, index) => {
            return { ...item, ...{ rating: 0 } }
          }),
        }
      } else {
        nextState = {}
      }
      return nextState
    },
    [SET_SELECTED_YEAR]: (state, action) => {
      const { selectedYear } = action.payload
      let nextState = {
        ...state,
        selectedYear,
      }
      return nextState
    },
    [SET_RATING]: (state, action) => {
      const { movie, rating } = action.payload
      const index = state[state.selectedYear].findIndex(item => item.id === movie.id)
      let nextState = {
        ...state,
        selectedYear: state.selectedYear,
        [state.selectedYear]: state[state.selectedYear].map((item, dataIndex) => {
          return dataIndex === index ? { ...item, ...{ rating } } : { ...item }
        }),
      }
      return nextState
    },
    [CLEAN_MOVIES]: (state, action) => {
      return {}
    },
  },
  {}
)
