import React, { Component } from 'react'
import { SelectField } from 'react-md'
import axios from 'axios'
import { getData } from '../../utils'
import Chart from './Chart/'
import OperationsTable from './OperationsTable'
import ControlPanel from './ControlPanel'
import Timer from './Timer'
import openSocket from 'socket.io-client'

import config from '../../config'

import './index.css'

const { api } = config

const COINS = ['BTC', 'ETH', 'LTC']

const socket = openSocket('http://10.25.128.242:3000')

function subscribeToChannel(nameGame, cb) {
  socket.on('game1x1.'+nameGame+ ':MarginChange', timestamp => cb(null, timestamp))
  socket.emit('subscribeToTimer', 1000)
}

// const tableData = [
//   {
//     id: 0,
//     type: 'buy',
//     date: moment().startOf('hour').fromNow(),
//     user: 'amadev',
//     benefit: '23%',
//   },
//   {
//     id: 1,
//     type: 'buy',
//     date: moment().endOf('day').fromNow(),
//     user: 'amadev',
//     benefit: '23%',
//   },
//   {
//     id: 2,
//     type: 'buy',
//     date: moment().startOf('day').fromNow(),
//     user: 'amadev',
//     benefit: '23%',
//   }
// ]



class Game extends Component {
  state = {
    tableData: [],
    profit: 0,
    currentPrice: 0,
    timeToEnd: 0,
    balance: 50,
    eth_balance: 0,
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const nameGame = localStorage.getItem('currentGame')
    const that = this

    subscribeToChannel(nameGame, (err, timestamp) => {
      console.log('timestamp', timestamp)
      this.setState({
        timestamp
      })
    });

    axios.post(api.joinGame, {
      token,
      nameGame,
    })
    .then(function (response) {
      console.log('joinGame', response)
      const { gameUserId, timeLeft } = response.data
      console.log('timeLeft', timeLeft)
      localStorage.setItem('gameUserId', gameUserId)
    })
    .catch(function (error) {
      console.log(error)
      // addToast(error)
    })

    // getData().then(data => {
    //   this.setState({ data })
    // })

    // this.interval = setInterval((that) => {
    //   const obj = {
    //     absoluteChange: undefined,
    //     close: 25.710416,
    //     date: new Date(),
    //     dividend: "",
    //     high: 25.835021381744056,
    //     low: 25.411360259406774,
    //     open: 25.436282332605284,
    //     percentChange: undefined,
    //     split: "",
    //     volume: 38409100,
    //   }
    //
    // }, 1000, this)

    const socket = new WebSocket(api.ws)
    socket.onmessage = event => {
      const change = JSON.parse(event.data)
      const { ETHBTC } = change
      // console.log('BTCUSDT', BTCUSDT)
      const { data = [] } = this.state
      const obj = {
        ...ETHBTC,
        date: new Date(),
      }

      const currentPrice = obj.high

      // const obj = {
      //     absoluteChange: undefined,
      //     close: 25.710416,
      //     date: new Date(),
      //     dividend: "",
      //     high: 25.835021381744056,
      //     low: 25.411360259406774,
      //     open: 25.436282332605284,
      //     percentChange: undefined,
      //     split: "",
      //     volume: 38409100,
      //   }

      const newData = [...data, obj]
      this.setState({
        data: newData,
        currentPrice,
      })
    };
  }

  buy = (value) => {
    const token = localStorage.getItem('token')
    const nameGame = localStorage.getItem('currentGame')
    const gameUserId = localStorage.getItem('gameUserId')
    const numberOfdata = this.state.tableData.length
    const that = this

    axios.post(api.buy, {
      token,
      nameGame,
      currency: 'ETHBTC',
      quantity: +value,
      sellBuy: 1,
      gameUserId,
    })
    .then(function (response) {
      console.log(response)
      const { data = {}} = response
      const { transaction, wallet, eth_balance } = data
      console.log('transaction', transaction)

      const obj = {
        id: numberOfdata + 1,
        type: 'buy',
        date: new Date(),
        user: 'amadev',
        amount: transaction.quantity,
        currencyPrice: transaction.currencyPrice,
        balance: wallet[0].quantity,
        eth_balance: wallet[1].quantity,
      }

      // console.log('transaction', transaction)
      that.updateTableDate(obj)
    })
    .catch(function (error) {
      console.log(error)
      // addToast(error)
    })

    console.log('buy', value)
  }

  sell = (value) => {
    const token = localStorage.getItem('token')
    const nameGame = localStorage.getItem('currentGame')
    const gameUserId = localStorage.getItem('gameUserId')
    const numberOfdata = this.state.tableData.length
    const that = this

    axios.post(api.buy, {
      token,
      nameGame,
      currency: 'ETHBTC',
      quantity: +value,
      sellBuy: 0,
      gameUserId,
    })
    .then(function (response) {
      console.log(response)
      const { data = {}} = response
      const { transaction, wallet } = data
      console.log('transaction', transaction)

      const obj = {
        id: numberOfdata + 1,
        type: 'sell',
        date: new Date(),
        user: 'amadev',
        amount: transaction.quantity,
        currencyPrice: transaction.currencyPrice,
        balance: wallet[0].quantity,
        eth_balance: wallet[1].quantity,
      }

      // console.log('transaction', transaction)
      that.updateTableDate(obj)
    })
    .catch(function (error) {
      console.log(error)
      // addToast(error)
    })

    console.log('sell', value)
  }

  updateTableDate = (transaction) => {
    this.setState((state) => {
      const { tableData = [], currentPrice } = state
      const { currencyPrice, balance, eth_balance } = transaction
      const newProfit = Number(((currentPrice / currencyPrice) - 1) * 100).toFixed(2)
      const newTableData = [...tableData, transaction]
      return {
        tableData: newTableData,
        profit: newProfit,
        balance,
        eth_balance,
      }
    })
  }

  render() {
    const nameGame = localStorage.getItem('currentGame')

    // console.log('state', this.state)
    // console.log('props', this.props)
    // console.log('nameGame', nameGame)

    const {
      data,
      tableData,
      profit,
      timeToEnd,
      balance,
      eth_balance,
    } = this.state
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
        <Timer timeToEnd={timeToEnd} />
        <div className="game-wrapper">
          <div
            className="chart-wrapper"
            ref={(el) => this.chartWr = el}
          >
            {chart}
          </div>
          <div className="coin-controll-wrapper">
            <OperationsTable
              tableData={tableData}
            />
          </div>
        </div>
        <ControlPanel
          profit={profit}
          balance={balance}
          eth_balance={eth_balance}
          buy={this.buy}
          sell={this.sell}
        />
      </div>
    )
  }
}

export default Game
