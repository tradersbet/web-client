import React, { PureComponent } from 'react'
import {
  Button,
  DialogContainer,
  TextField,
  Autocomplete,
} from 'react-md'

const filterType = Autocomplete.caseInsensitiveFilter

class NewGameModal extends PureComponent {
  state = {}

  onChange = (field, v) => {
    this.setState({
      [field]: v,
    })
  }

  createGame = () => {
    const { create, hide } = this.props
    create(this.state)
    hide()
  }

  render() {
    const {
      visible,
      hide,
      show,
    } = this.props
    // Actions can either be an object of props to build a Button,
    // or valid react components. When the action is a set of props,
    // it defaults to creating a flat button. Unique keys will automatically
    // be cloned into the buttons along with an additional class name for styling

    const actions = []
    actions.push({ secondary: true, children: 'Cancel', onClick: hide })
    actions.push(<Button flat primary onClick={this.createGame}>Confirm</Button>)

    return (
      <div>
        <DialogContainer
          id="simple-action-dialog"
          visible={visible}
          onHide={hide}
          actions={actions}
          title="Create a new game!"
        >
          <TextField
            id="simple-action-dialog-field"
            label="Game title"
            placeholder="Title..."
            onChange={(v) => this.onChange('gameName', v)}
          />
          <Autocomplete
            id="users-invite"
            label="Users invitation"
            placeholder="Username"
            data={['user1', 'user2']}
            filter={filterType}
          />
          <TextField
            id="simple-action-dialog-field"
            type="number"
            label="Deposit"
            placeholder="0.01 btc"
            onChange={(v) => this.onChange('deposit', v)}
          />
          <TextField
            id="simple-action-dialog-field"
            type="text"
            label="Expiration time"
            placeholder=""
            onChange={(v) => this.onChange('time', v)}
          />
        </DialogContainer>
      </div>
    )
  }
}

export default NewGameModal
