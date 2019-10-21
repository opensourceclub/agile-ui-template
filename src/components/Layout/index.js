import { compose } from "recompose";
import { connect } from "react-redux";

import { toggleSidebar } from "../../store/LayoutState";

import React from 'react';
import { withStyles, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';

import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Typography from '../../pages/typography';
import Tables from '../../pages/tables';

const Layout = ({ classes, isSidebarOpened }) => (
  <div className={classes.root}>
    <CssBaseline />
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Sidebar />
        <div className={classnames(classes.content, { [classes.contentShift]: isSidebarOpened })}>
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  </div>
);

const styles = theme => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 240px)`,
    minHeight: '100vh',
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing.unit * 6}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  }
});

export default compose(
  connect(
    state => ({
      isSidebarOpened: state.layout.isSidebarOpened
    }),
    { toggleSidebar }
  )
)(withStyles(styles)(Layout));
