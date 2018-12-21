import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { withRouter } from 'react-router';
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Drawer, Toolbar } from 'react-md';

import { SignIn } from '../auth'
import Home from '../home'

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
        <Toolbar
          colored
          fixed
          title="tradersBet"
          nav={
            <Button
              icon
              onClick={this.showDrawer}
            >
              menu
            </Button>
          }
        />
        <CSSTransitionGroup
          component="div"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          className="md-toolbar-relative md-grid"
        >
          <Switch key={location.pathname}>
            <Route path={routes.home} exact component={Home} />
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
