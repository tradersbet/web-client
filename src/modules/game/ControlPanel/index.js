import React, { Component } from 'react'
import { TextField, Button } from 'react-md'
import './index.css'

class ControlPanel extends Component {
  render() {
    return (
      <div className="controlPanel">
        <div className="row profit">
          <div>BTC: 4%</div>
          <div>ETH: 3%</div>
          <div>LTC: -3%</div>
        </div>
        <div className="row">
          <div style={{marginRight: '30px'}}>
            <div>Balance: 0.04btc</div>
            <div>Profit: 4%</div>
          </div>
          <div className="row">
            <TextField id="placeholder-only-title" type="number" placeholder="0.00" className="md-cell md-cell--bottom" />
            <Button flat primary swapTheming>Buy</Button>
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
