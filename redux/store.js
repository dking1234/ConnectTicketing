import { createStore, combineReducers } from 'redux';
import tripReducer from './reducers/tripReducer';

const rootReducer = combineReducers({
  trip: tripReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer);

export default store;
