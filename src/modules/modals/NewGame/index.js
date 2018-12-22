import React, { PureComponent } from 'react'
import {
  Button,
  DialogContainer,
  TextField,
  Autocomplete,
} from 'react-md'

const filterType = Autocomplete.caseInsensitiveFilter

class NewGameModal extends PureComponent {
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
    actions.push(<Button flat primary onClick={hide}>Confirm</Button>)

    return (
      <div>
        <Button raised onClick={show}>Open the Dialog</Button>
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
          />
          <TextField
            id="simple-action-dialog-field"
            type="date"
            label="Expiration time"
            placeholder=""
            defaultValue={new Date()}
          />
        </DialogContainer>
      </div>
    )
  }
}

export default NewGameModal
