import { combineReducers } from 'redux'

import simpleReducer from './simpleReducer'
import user from './usersReducer'
import userRating from './usersRatingReducer'

export default combineReducers({
  simpleReducer,
  user,
  userRating,
})
