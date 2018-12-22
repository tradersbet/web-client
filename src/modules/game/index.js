import React, { Component } from 'react'
import { SelectField } from 'react-md'
import { getData } from '../../utils'
import Chart from './Chart/'
import OperationsTable from './OperationsTable'
import ControlPanel from './ControlPanel'

import './index.css'

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

    let chartWidth = 0
    if (this.chartWr) {
      chartWidth = this.chartWr.offsetWidth
    }

    if (data == null) {
      return <div>Loading...</div>
    }

    const chart = this.chartWr
      ? <Chart data={data} width={chartWidth} />
      : null

    const simplifiedMenu = false

    return (
      <div className="wrapper">
        <SelectField
          id="select-coin"
          placeholder="Current Coin"
          className="md-cell"
          menuItems={COINS}
          position={SelectField.Positions.BELOW}
          defaultValue={COINS[0]}
          simplifiedMenu={simplifiedMenu}
        />
        <div className="game-wrapper">
          <div
            className="chart-wrapper"
            ref={(el) => this.chartWr = el}
          >
            {chart}
          </div>
          <div className="coin-controll-wrapper">
            <OperationsTable />
          </div>
        </div>
        <ControlPanel />
      </div>
    )
  }
}

export default Game
