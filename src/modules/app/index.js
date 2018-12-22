import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { withRouter } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Drawer, Toolbar } from 'react-md';


import Header from './Header'

import { SignIn } from '../auth'

import Dashboard from '../dashboard'
import History from '../history'
import News from '../news'
import Game from '../game'

import NavItemLink from './NavItemLink'
import Inbox from './Inbox';
import Starred from './Starred';
import SendMail from './SendMail'

import config from '../../config'
const { routes, navItems } = config

class App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = { visible: false }

  componentDidMount() {
    // Need to set the renderNode since the drawer uses an overlay
    this.dialog = document.getElementById('drawer-routing-example-dialog')
  }

  showDrawer = () => {
    this.setState({ visible: true })
  }

  hideDrawer = () => {
    this.setState({ visible: false })
  }

  handleVisibility = (visible) => {
    this.setState({ visible })
  }

  render() {
    const { location } = this.props
    const { visible } = this.state

    return (
      <div>
        <Header
          showDrawer={this.showDrawer}
        />
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-toolbar-relative md-grid"
        >
          <Switch key={location.pathname}>
            <Route path={routes.dashboard} exact component={Dashboard} />
            <Route path={routes.game} exact component={Game} />
            <Route path={routes.news} exact component={News} />
            <Route path={routes.history} exact component={History} />

            <Route path={navItems[1].to} component={Starred} />
            <Route path={navItems[2].to} component={SendMail} />
          </Switch>
        </CSSTransitionGroup>
        <Drawer
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          onVisibilityChange={this.handleVisibility}
          header={<Toolbar title={<Link to="/components/drawers#react-router-example">Menu</Link>} />}
          renderNode={this.dialog}
          navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
        />
      </div>
    )
  }
}

export default withRouter(App)
