import { withTheme } from '@material-ui/core/styles';
import { compose, withState, withHandlers, lifecycle }  from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { toggleSidebar } from '../../store/LayoutState';

import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  withStyles } from "@material-ui/core";
import {
  FormatSize as TypographyIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from 'classnames';

import SidebarLink from './components/SidebarLink';

const structure = [
  { id: 0, label: 'Typography', link: '/app/typography', icon: <TypographyIcon /> },
  { id: 1, label: 'Tables', link: '/app/tables', icon: <TableIcon /> }
];

const SidebarView = ({ classes, toggleSidebar, isSidebarOpened, isPermanent, location }) => {
  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton
          onClick={toggleSidebar}
        >
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => <SidebarLink key={link.id} location={location} isSidebarOpened={isSidebarOpened} {...link} />)}
      </List>
    </Drawer>
  );
}

const drawerWidth = 240;

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  sidebarList: {
    marginTop: theme.spacing.unit * 6,
  },
  mobileBackButton: {
    marginTop: theme.spacing.unit * .5,
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing.unit * .625,
    },
    [theme.breakpoints.up("md")]: {
      display: 'none',
    }
  }
});

export default compose(
  withRouter,
  withTheme(),
  connect(
    state => ({
      isSidebarOpened: state.layout.isSidebarOpened,
    }),
    { toggleSidebar },
  ),
  withState('isPermanent', 'setPermanent', true),
  withHandlers({
    handleWindowWidthChange: ({ width, isPermanent, setPermanent, theme }) => () => {
      const windowWidth = window.innerWidth;
      const breakpointWidth = theme.breakpoints.values.md;
      const isSmallScreen = windowWidth < breakpointWidth;

      if (isSmallScreen && isPermanent) {
        setPermanent(false);
      } else if (!isSmallScreen && !isPermanent) {
        setPermanent(true);
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      window.addEventListener('resize', this.props.handleWindowWidthChange);
      this.props.handleWindowWidthChange();
    },
    componentWillUnmount() {
      window.removeEventListener('resize', this.props.handleWindowWidthChange);
    },
  }),
)(withStyles(styles, { withTheme: true })(SidebarView));
