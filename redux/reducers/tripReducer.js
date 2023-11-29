// tripReducer.js

const initialState = {
    origin: '', // Assuming origin should be a string
    destination: '',
    departureDate: '',
  };
  
  const tripReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TRIP_DETAILS':
        return {
          ...state,
          origin: action.payload.origin,
          destination: action.payload.destination,
          departureDate: action.payload.departureDate,
        };
      default:
        return state;
    }
  };
  
  export default tripReducer;
  