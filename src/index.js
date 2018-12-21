import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Chart from './chart/'
import { getData } from './utils'
import App from './modules/app'
import WebFontLoader from 'webfontloader'
import './index.css'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

class ChartComponent extends Component {
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
      <Chart data={this.state.data} />
    )
  }
}

render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root')
)
