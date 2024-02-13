import {
  LOGIN,
  LOGOUT,
  UPDATE_USER,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../actions/actions';

const initialState = {
  user: {
    name: '',
    password: '',
    email: '',
    birthday: '',
  },
  favorites: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        user: action.user,
        token: action.token,
        favorites: [...state.favorites, action.movieId],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        user: action.user,
        token: action.token,
        favorites: state.favorites.filter((id) => id !== action.movieId),
      };
    default:
      return state;
  }
};

export default rootReducer;
