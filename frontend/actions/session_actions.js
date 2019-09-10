export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
import * as SessionAPIUtil from '../util/session_api_util';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

// Action creators ^^^
////////////////////////////////////////////
// Thunk action creators vvv

export const signup = user => dispatch => (
  SessionAPIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  SessionAPIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout().then(() => (
    dispatch(logoutCurrentUser())
  ))
);