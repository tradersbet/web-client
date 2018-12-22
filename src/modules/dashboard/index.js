import React, { Component } from 'react'
import {
  Card,
  CardTitle,
  CardText,
  Button,
} from 'react-md'
import moment from 'moment'
import NewGameModal from '../modals/NewGame'

import './index.css'

const style = { maxWidth: 320 }

const games = [
  {
    gameName: 'Some active game',
    author: 'Some author',
    status: 'active_game',
    deposit: 0.44,
    expirationTime: '12.03.2019',
  },
  {
    gameName: 'Some my game',
    author: 'Some author',
    status: 'my_game',
    deposit: 0.44,
    expirationTime: '02.01.2019',
  },
  {
    gameName: 'Some available game',
    author: 'Some author',
    status: 'available_game',
    deposit: 0.44,
    expirationTime: '22.05.2019',
  },
  {
    gameName: 'Some available game 2',
    author: 'Some author',
    status: 'available_game',
    deposit: 0.44,
    expirationTime: '03.03.2019',
  },
]

const CardGame = ({game = {}}) => {
  let content = (
    <p>
      The game was created by {game.author}. Deposit: {game.deposit}.
    </p>
  )

  if (game.status === 'my_game') {
    content = (
      <div>
        <p>The game was created by {game.author}. Deposit: {game.deposit}.</p>
        <Button raised secondary iconBefore={false} iconClassName="fa fa-hand-paper-o">
          Delete
        </Button>
      </div>
    )
  }

  return (
    <Card style={style} className="md-block-centered">
      <CardTitle
        title={game.gameName}
        subtitle={`Expired in ${moment(game.expirationTime, "DD.MM.YYYY").fromNow()}`}
      />
      <CardText>
        {content}
      </CardText>
    </Card>
  )
}

class Dashboard extends Component {
  state = {}

  openNewGameModal = () => {
    this.setState({ visibleNewGame: true })
  }

  closeNewGameModal = () => {
    this.setState({ visibleNewGame: false })
  }

  render() {
    const { visibleNewGame } = this.state
    const activeGames = games
      .filter((game) => (game.status === 'active_game'))
      .map((game) => (
        <div key={game.gameName}>
          <CardGame game={game} />
        </div>
      ))

    const myGames = games
      .filter((game) => (game.status === 'my_game'))
      .map((game) => (
        <div key={game.gameName}>
          <CardGame game={game} />
        </div>
      ))

    const availableGames = games
      .filter((game) => (game.status === 'available_game'))
      .map((game) => (
        <div key={game.gameName}>
          <CardGame game={game} />
        </div>
      ))

    return (
      <div className="dashboard">
        <div className="games-category">
          <div className="title">Active games:</div>
          <div className="games-list">{activeGames}</div>
        </div>
        <div className="games-category">
          <div className="title my-games">My games:</div>
          <div className="games-list">{myGames}</div>
        </div>
        <div className="games-category">
          <div className="title available-games">Available games:</div>
          <div className="games-list">{availableGames}</div>
        </div>
        <Button
          className="new-game-btn"
          floating
          tooltipLabel="Create a new game"
          tooltipPosition="top"
          onClick={this.openNewGameModal}
          primary
        >
          add
        </Button>
        <NewGameModal
          visible={visibleNewGame}
          show={this.openNewGameModal}
          hide={this.closeNewGameModal}
        />
      </div>
    )
  }
}

export default Dashboard
