import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  withStyles
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon
} from "@material-ui/icons";
import { fade } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";

import { Badge, Typography } from "../Wrappers";
import Notification from "../Notification";

import { compose, withState, withHandlers } from "recompose";
import { connect } from "react-redux";

import { signOut } from "../../store/LoginState";
import { toggleSidebar } from "../../store/LayoutState";

const notifications = [
  { id: 0, color: "warning", message: "警告事件" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "成功事件"
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "提醒事件1"
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "提醒事件2"
  }
];

const Header = ({ classes, isSidebarOpened, toggleSidebar, ...props }) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <IconButton
        color="inherit"
        onClick={toggleSidebar}
        className={classNames(
          classes.headerMenuButton,
          classes.headerMenuButtonCollapse
        )}
      >
        {isSidebarOpened ? (
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        ) : (
          <MenuIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        )}
      </IconButton>
      <Typography variant="h6" weight="medium" className={classes.logotype}>
        Agile UI Template
      </Typography>
      <div className={classes.grow} />
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="mail-menu"
        onClick={props.openNotificationsMenu}
        className={classes.headerMenuButton}
      >
        <Badge
          badgeContent={
            props.isNotificationsUnread ? notifications.length : null
          }
          color="warning"
        >
          <NotificationsIcon classes={{ root: classes.headerIcon }} />
        </Badge>
      </IconButton>
      <IconButton
        aria-haspopup="true"
        color="inherit"
        className={classes.headerMenuButton}
        aria-controls="profile-menu"
        onClick={props.openProfileMenu}
      >
        <AccountIcon classes={{ root: classes.headerIcon }} />
      </IconButton>
      <Menu
        id="notifications-menu"
        open={Boolean(props.notificationsMenu)}
        anchorEl={props.notificationsMenu}
        onClose={props.closeNotificationsMenu}
        className={classes.headerMenu}
        disableAutoFocusItem
      >
        {notifications.map(notification => (
          <MenuItem
            key={notification.id}
            onClick={props.closeNotificationsMenu}
            className={classes.headerMenuItem}
          >
            <Notification {...notification} typographyVariant="inherit" />
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="profile-menu"
        open={Boolean(props.profileMenu)}
        anchorEl={props.profileMenu}
        onClose={props.closeProfileMenu}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant="h4" weight="medium">
            李想
          </Typography>
        </div>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> 账户
        </MenuItem>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <NotificationsIcon className={classes.profileMenuIcon} /> 提醒
        </MenuItem>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <SettingsIcon className={classes.profileMenuIcon} /> 设置
        </MenuItem>
        <div className={classes.profileMenuUser}>
          <Typography
            className={classes.profileMenuLink}
            color="primary"
            onClick={props.signOut}
          >
            登出 
          </Typography>
        </div>
      </Menu>
    </Toolbar>
  </AppBar>
);

const styles = theme => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  appBar: {
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  hide: {
    display: "none"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing.unit * 2.5,
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08)
    }
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 250
    }
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer"
    }
  },
  searchIconOpened: {
    right: theme.spacing.unit * 1.25
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing.unit * 1.25,
    width: "100%"
  },
  messageContent: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenu: {
    marginTop: theme.spacing.unit * 7
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  headerMenuButton: {
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit / 2
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing.unit * 2
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 0.35)"
  },
  headerIconCollapse: {
    color: "white"
  },
  profileMenu: {
    minWidth: 265
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2
  },
  profileMenuItem: {
    color: theme.palette.text.hint
  },
  profileMenuIcon: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.text.hint
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light
    }
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing.unit * 2
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0
  },
  sendMessageButton: {
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textTransform: "none"
  },
  sendButtonIcon: {
    marginLeft: theme.spacing.unit * 2
  }
});

export default compose(
  connect(
    state => ({
      isSidebarOpened: state.layout.isSidebarOpened
    }),
    { signOut, toggleSidebar }
  ),
  withState("notificationsMenu", "setNotificationsMenu", null),
  withState("isNotificationsUnread", "setIsNotificationsUnread", true),
  withState("profileMenu", "setProfileMenu", null),
  withHandlers({
    openNotificationsMenu: props => event => {
      props.setNotificationsMenu(event.currentTarget);
      props.setIsNotificationsUnread(false);
    },
    closeNotificationsMenu: props => () => {
      props.setNotificationsMenu(null);
    },
    openProfileMenu: props => event => {
      props.setProfileMenu(event.currentTarget);
    },
    closeProfileMenu: props => () => {
      props.setProfileMenu(null);
    }
  })
)(withStyles(styles)(Header));
