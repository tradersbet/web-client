import React, { Component } from 'react'
import { render } from 'react-dom'
import Chart from './chart/'
import { getData } from './utils'

class ChartComponent extends Component {
  componentDidMount() {
    getData().then(data => {
      this.setState({ data })
    })
  }

  render() {
    if (this.state == null) {
      return <div>Loading...</div>
    }

    return (
      <Chart data={this.state.data} />
    )
  }
}

render(
  <ChartComponent />,
  document.getElementById('root')
)
