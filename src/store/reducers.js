import { combineReducers } from 'redux';

import layout from './LayoutState';
import login from './LoginState';

export default combineReducers({
  layout,
  login,
});