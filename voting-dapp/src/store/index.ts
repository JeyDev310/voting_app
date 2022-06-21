import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from "redux";

import { votingPollReducer } from "./voting/voting.reducer";

const rootReducer = combineReducers({
  votingModule: votingPollReducer,
})

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  )
);

export default store;
