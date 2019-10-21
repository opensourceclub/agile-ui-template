import React from "react";
import {
  Grid,
  CircularProgress,
  withStyles,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";

import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser, resetError } from "../../store/LoginState";

const Login = ({ classes, ...props }) => (
  <Grid container className={classes.container}>
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <Tabs
          value={props.activeTabId}
          onChange={props.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="登录" classes={{ root: classes.tab }} />
          <Tab label="创建用户" classes={{ root: classes.tab }} />
        </Tabs>
        {props.activeTabId === 0 && (
          <React.Fragment>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={props.loginValue}
              onChange={e => props.handleInput(e, "login")}
              margin="normal"
              placeholder="电子邮箱"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={props.passwordValue}
              onChange={e => props.handleInput(e, "password")}
              margin="normal"
              placeholder="密码"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {props.isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    props.loginValue.length === 0 ||
                    props.passwordValue.length === 0
                  }
                  onClick={props.handleLoginButtonClick}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  登录
                </Button>
              )}
            </div>
          </React.Fragment>
        )}
        {props.activeTabId === 1 && (
          <React.Fragment>
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={props.nameValue}
              onChange={e => props.handleInput(e, "name")}
              margin="normal"
              placeholder="姓名"
              type="email"
              fullWidth
            />
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={props.loginValue}
              onChange={e => props.handleInput(e, "login")}
              margin="normal"
              placeholder="电子邮箱"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField
                }
              }}
              value={props.passwordValue}
              onChange={e => props.handleInput(e, "password")}
              margin="normal"
              placeholder="密码"
              type="password"
              fullWidth
            />
            <div className={classes.creatingButtonContainer}>
              {props.isLoading ? (
                <CircularProgress size={26} />
              ) : (
                <Button
                  onClick={props.handleLoginButtonClick}
                  disabled={
                    props.loginValue.length === 0 ||
                    props.passwordValue.length === 0 ||
                    props.nameValue.length === 0
                  }
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.createAccountButton}
                >
                  创建 
                </Button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  </Grid>
);

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  },
  form: {
    width: 320
  },
  tab: {
    fontWeight: 400,
    fontSize: 18
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 4
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  },
  googleButton: {
    marginTop: theme.spacing.unit * 6,
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none"
  },
  googleButtonCreating: {
    marginTop: 0
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing.unit * 2
  },
  creatingButtonContainer: {
    marginTop: theme.spacing.unit * 2.5,
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  createAccountButton: {
    height: 46,
    textTransform: "none"
  },
  formDividerContainer: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: "flex",
    alignItems: "center"
  },
  formDividerWord: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40"
  },
  errorMessage: {
    textAlign: "center"
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  loginLoader: {
    marginLeft: theme.spacing.unit * 4
  },
  copyright: {
    marginTop: theme.spacing.unit * 4,
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing.unit * 2
    }
  }
});

export default compose(
  connect(
    state => ({
      isLoading: state.login.isLoading,
      isAuthenticated: state.login.isAuthenticated,
      error: state.login.error
    }),
    { loginUser, resetError }
  ),
  withRouter,
  withState("activeTabId", "setActiveTabId", 0),
  withState("nameValue", "setNameValue", ""),
  withState("loginValue", "setLoginValue", ""),
  withState("passwordValue", "setPasswordValue", ""),
  withHandlers({
    handleTabChange: props => (e, id) => {
      props.setActiveTabId(id);
    },
    handleInput: props => (e, input = "login") => {
      if (props.error) {
        props.resetError();
      }

      if (input === "login") {
        props.setLoginValue(e.target.value);
      } else if (input === "password") {
        props.setPasswordValue(e.target.value);
      } else if (input === "name") {
        props.setNameValue(e.target.value);
      }
    },
    handleLoginButtonClick: props => () => {
      props.loginUser(props.loginValue, props.passwordValue);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.error && nextProps.error) {
        this.props.setPasswordValue("");
      }
    }
  })
)(withStyles(styles, { withTheme: true })(Login));
