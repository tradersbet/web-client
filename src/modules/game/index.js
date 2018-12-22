import React, { Component } from 'react'
import { getData } from '../../utils'
import Chart from './Chart/'

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
    console.log('data', data)

    if (data == null) {
      return <div>Loading...</div>
    }

    return (
      <div>
        Game
        <div>
          <Chart data={this.state.data} width="600"/>
        </div>
      </div>
    )
  }
}

export default Game
