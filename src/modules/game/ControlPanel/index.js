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
    const { buy, sell } = this.props
    const { buyInput } = this.state
    buy(buyInput)
  }

  onSell = () => {
    const { buy, sell } = this.props
    const { sellInput } = this.state
    sell(sellInput)
  }

  render() {
    const { profit, balance, eth_balance } = this.props

    return (
      <div className="controlPanel">
        <div className="row profit">
          <div>ETH: {profit}%</div>
        </div>
        <div className="row">
          <div style={{marginRight: '30px'}}>
            <div>BTC Balance: {balance} btc</div>
            <div>EHT Balance: {eth_balance} eth</div>
          </div>
          <div className="row">
            <TextField
              id="placeholder-only-title"
              type="number"
              placeholder="0.00"
              className="md-cell md-cell--bottom"
              onChange={(v) => this.onChange('buyInput', v)}
            />
            <Button flat primary swapTheming onClick={this.onBuy}>Buy</Button>
          </div>
          <div className="row">
            <TextField
              id="placeholder-only-title"
              type="number"
              placeholder="0.00"
              className="md-cell md-cell--bottom"
              onChange={(v) => this.onChange('sellInput', v)}
            />
            <Button flat secondary swapTheming onClick={this.onSell}>Sell</Button>
          </div>
        </div>
      </div>

    )
  }
}

export default ControlPanel
