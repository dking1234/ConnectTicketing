// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Assuming your reducers are in a folder named 'reducers'

const store = createStore(rootReducer);

export default store;
