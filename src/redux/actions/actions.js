// Action Types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

// Action Creators

export const login = (user, token) => ({
  type: LOGIN,
  user,
  token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const addToFavorites = (user, token, movieId) => ({
  type: ADD_TO_FAVORITES,
  user,
  token,
  movieId,
});

export const removeFromFavorites = (user, token, movieId) => ({
  type: REMOVE_FROM_FAVORITES,
  user,
  token,
  movieId,
});
