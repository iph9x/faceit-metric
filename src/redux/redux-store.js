import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import playerReducer from "./player/reducer";
import matchesReducer from "./match/reducer";

const reducers = combineReducers({
    playerSearch: playerReducer,
    matchesList: matchesReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
