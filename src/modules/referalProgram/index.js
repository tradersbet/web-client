import React, { Component } from 'react'
import { connect } from 'redux'

class ReferalProgram extends Component {
  render() {
    const { user = {} } = this.props
    const link = `https://cryptoservice24.com/ref/${user.refLink}`
    return (
      <div>
        Your Referal Program:

        <Card className="md-cell md-cell--12 md-text-container">
        <CardTitle title="Referals Program" />
        <CardText>
          <FontIcon
            className={cn('drawers__routing__send-icon', {
              'drawers__routing__send-icon--active': sending,
            })}
          >
            send
          </FontIcon>
            Your link: {link}
        </CardText>
      </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDistpachToProps = (dispatch) => {
  return {}
}

export default connect({
  mapStateToProps,
  mapDistpachToProps,
})(ReferalProgram)
