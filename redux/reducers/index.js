// reducers/index.js
import { combineReducers } from 'redux';
import tripReducer from './tripReducer';
import passengersReducer from './passengersReducer'; // Add this import

const rootReducer = combineReducers({
  trip: tripReducer,
  passengers: passengersReducer, // Add this line
  // Add other reducers here if needed
});

export default rootReducer;
