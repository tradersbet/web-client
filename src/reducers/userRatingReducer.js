import {
  GET_USER_RATING,
  GOT_USER_RATING,
 } from './../actions'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_RATING:
      return {
        ...state,
      }
    case GOT_USER_RATING:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}
