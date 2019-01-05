import {
  GET_USER,
  CREATE_USER,
  gotUser,
  gotFailure,
  GET_USER_RATING,
  gotUserRating,
} from '../actions/';

const apiConfig = {
  getUser1: {
    triggerActionType: GET_USER,
    successAction: gotUser,
    failureAction: gotFailure,
    getOptions: ({id}) => ({
      method: 'get',
      url: `https://cryptoservice24.com/user/${id}`,
    }),
  },
  createUser: {
    triggerActionType: CREATE_USER,
    successAction: gotUser,
    failureAction: gotFailure,
    getOptions: ({user}) => ({
      method: 'post',
      url: 'https://cryptoservice24.com/newUser/',
      data: user,
    }),
  },
  getUserRating: {
    triggerActionType: GET_USER_RATING,
    successAction: gotUserRating,
    failureAction: gotFailure,
    getOptions: ({id}) => ({
      method: 'get',
      url: `https://cryptoservice24.com/userRating/${id}`,
    }),
  },
}

export default apiConfig
