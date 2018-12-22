import React, { Component } from 'react'
import { getData } from '../../utils'
import Chart from './Chart/'
import { SelectField } from 'react-md'

import './index.scss'

const COINS = ['BTC', 'ETH', 'LTC'];

class Game extends Component {
  state = {}

  componentDidMount() {
    getData().then(data => {
      this.setState({ data })
    })

    this.interval = setInterval((that) => {
      const obj = {
        absoluteChange: undefined,
        close: 25.710416,
        date: new Date(),
        dividend: "",
        high: 25.835021381744056,
        low: 25.411360259406774,
        open: 25.436282332605284,
        percentChange: undefined,
        split: "",
        volume: 38409100,
      }
      const { data } = that.state
      const newData = [...data, obj]
      that.setState({ data: newData })
    }, 1000, this)
  }

  render() {
    const { data } = this.state
    // console.log('data', data)

    const chartWidth = window.innerWidth * 0.7

    if (data == null) {
      return <div>Loading...</div>
    }

    const simplifiedMenu = false

    return (
      <div >
        <SelectField
          id="select-coin"
          placeholder="Current Coin"
          className="md-cell"
          menuItems={COINS}
          position={SelectField.Positions.BELOW}
          defaultValue={COINS[0]}
          simplifiedMenu={simplifiedMenu}
        />
        <div className="game-wrapper md-grid">
          <div className="chart-wrapper md-cell--7">
            <Chart data={data} width={chartWidth} />
          </div>
          <div className="coin-controll-wrapper md-cell--5">

          </div>
        </div>
      </div>
    )
  }
}

export default Game
