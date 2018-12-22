import React, { Component } from 'react'
import { TextField, Button } from 'react-md'
import './index.css'

class ControlPanel extends Component {
  state = {
    buyInput: '',
    sellInput: '',
  }

  onChange = (input, value) => {
    this.setState({
      [input]: value,
    })
  }

  onBuy = () => {
    const { buy } = this.props
    const { buyInput } = this.state
    buy(buyInput)
  }

  render() {
    const { profit, balance} = this.props

    return (
      <div className="controlPanel">
        <div className="row profit">
          <div>ETH: {profit}%</div>
        </div>
        <div className="row">
          <div style={{marginRight: '30px'}}>
            <div>Balance: {balance} btc</div>
            <div>Profit: 4%</div>
          </div>
          <div className="row">
            <TextField
              id="placeholder-only-title"
              type="number"
              placeholder="0.00"
              className="md-cell md-cell--bottom"
              onChange={(v) => this.onChange('buyInput', v)}
            />
            <Button flat primary swapTheming onClick={this.onBuy} >Buy</Button>
          </div>
          <div className="row">
            <TextField id="placeholder-only-title" type="number" placeholder="0.00" className="md-cell md-cell--bottom" />
            <Button flat secondary swapTheming>Sell</Button>
          </div>
        </div>
      </div>

    )
  }
}

export default ControlPanel
