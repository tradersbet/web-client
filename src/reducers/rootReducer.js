import { combineReducers } from 'redux'

import simpleReducer from './simpleReducer'
import user from './usersReducer'
import userRating from './userRatingReducer'

export default combineReducers({
  simpleReducer,
  user,
  userRating,
})
