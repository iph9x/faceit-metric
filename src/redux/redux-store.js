import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import playerReducer from "./player/reducer";
import matchesReducer from "./match/reducer";
import roomReducer from "./room/reducer";

const reducers = combineReducers({
  playerSearch: playerReducer,
  matchesList: matchesReducer,
  roomPage: roomReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
