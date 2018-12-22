import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import cn from 'classnames'
import {
  Collapse,
  Dialog,
  Card,
  Media,
  FontIcon,
} from 'react-md'

class Dismiss extends PureComponent {
  static propTypes = {
    cardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.onClick(this.props.index)
  }

  render() {
    const { cardId } = this.props
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className="md-btn md-pointer--hover badges__notifications__notification__close"
        aria-controls={cardId}
      >
        <FontIcon>close</FontIcon>
      </button>
    )
  }
}


const NotificationCard = ({ id, image, alt, message, index, onDismiss }) => (
  <Card id={id} className="md-cell md-cell--12 badges__notifications__notification">
    <div className="badges__notifications__notification__image">
      <Media aspectRatio="1-1">
        <img src={image} alt={alt} />
      </Media>
    </div>
    <p>{message}</p>
    <Dismiss index={index} onClick={onDismiss} cardId={id} />
  </Card>
)


const NotificationDialog = ({ visible, onDismiss, notifications }) => {
  const empty = !notifications.length

  let content
  if (empty) {
    content = (
      <div style={{color:'black'}}>No notifications</div>
    )
  } else {
    content = notifications.map((notification, i) => (
      <NotificationCard {...notification} key={notification.id} index={i} onDismiss={onDismiss} />
    ))
  }

  return (
    <Collapse collapsed={!visible}>
      <Dialog
        id="complex-example"
        title="Notifications"
        autopadContent={false}
        className="md-background badges__notifications__dialog"
        contentClassName={cn('badges__notifications__dialog__content', {
          'md-grid': !empty,
          'badges__notifications__dialog__content--empty': empty,
        })}
      >
        <CSSTransitionGroup transitionName="fade" transitionLeaveTimeout={150} transitionEnterTimeout={150}>
          {content}
        </CSSTransitionGroup>
      </Dialog>
    </Collapse>
  )
}

NotificationDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
}

export default NotificationDialog
