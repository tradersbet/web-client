export const GET_USER = 'GET_USER'
export const getUser = (id) => ({
  type: GET_USER,
  id,
})

export const GOT_USER = 'GOT_USER'
export const gotUser = (data) => ({
  type: GOT_USER,
  data,
})

export const CREATE_USER = 'CREATE_USER'
export const createUser = (user) => ({
  type: CREATE_USER,
  user,
})

export const GOT_FAILURE = 'GOT_FAILURE'
export const gotFailure = (error) => ({
  type: GOT_FAILURE,
  error,
})

export const GET_USER_RATING = 'GET_USER_RATING'
export const getUserRating = () => ({
  type: GET_USER_RATING,
})

export const GOT_USER_RATING = 'GOT_USER_RATING'
export const gotUserRating = (data) => ({
  type: GOT_USER_RATING,
  data,
})
