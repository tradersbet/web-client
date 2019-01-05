import React, { Component } from 'react'
import { connect } from 'redux'
import { getUserRating } from './../actions'

class UrerRating extends Component {
  componentDidMount() {
    const { getUserRating } = this.props
    if (getUserRating) {
      getUserRating()
    }
  }

  render() {
    const { userRating } = this.props
    if (!userRating) {
      return (
        <div>Loading ...</div>
      )
    }

    const list = userRating.map((data) => {
      const {
        id,
        userName,
        rating,
        registrationDate
      } = data
      return (
        <div key={id} className="userRating-row">
          <div className="id">{id}</div>
          <div className="userName">{userName}</div>
          <div className="rating">{rating}</div>
          <div className="registrationDate">{registrationDate}</div>
        </div>
      )
    })

    return (
      <div className="userRating">
        User Rating:
        {list}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userRating: state.userRating,
  }
}

const mapDistpachToProps = (dispatch) => {
  return {
    getUserRating: dispatch(getUserRating),
  }
}

export default connect({
  mapStateToProps,
  mapDistpachToProps,
})(UrerRating)