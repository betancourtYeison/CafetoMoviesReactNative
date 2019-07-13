/** Import modules **/
import { handleActions } from 'redux-actions'
import { SET_MOVIES, SET_RATING, CLEAN_MOVIES } from './../actions/types'

export const movies = handleActions(
  {
    [SET_MOVIES]: (state, action) => {
      const { data } = action.payload
      let nextState = null
      if (data.results.length > 0) {
        nextState = {
          ...data,
          results: data.results.map((item, index) => {
            return { ...item, ...{ rating: 0 } }
          }),
        }
      } else {
        nextState = {}
      }
      console.log('nextState', nextState)
      return nextState
    },
    [SET_RATING]: (state, action) => {
      const { movie, rating } = action.payload
      const index = state.results.findIndex(item => item.id === movie.id)
      let nextState = {
        ...state,
        results: state.results.map((item, dataIndex) => {
          return dataIndex === index ? { ...item, ...{ rating } } : { ...item }
        }),
      }
      return nextState
    },
    [CLEAN_MOVIES]: (state, action) => {
      return {
        loading: false,
        data: [],
      }
    },
  },
  []
)
