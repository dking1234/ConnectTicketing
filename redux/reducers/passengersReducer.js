const initialState = {
  count: 1, // Default value
};

const passengersReducer = (state = initialState, action) => {
  console.log('Passengers Reducer - Current State:', state);

  switch (action.type) {
    case 'SET_PASSENGERS':
      return {
        ...state,
        count: action.payload,
      };
    // Add other cases if needed
    // For example, you might want to handle resetting passengers to the initial state
    case 'RESET_PASSENGERS':
      return initialState;
    default:
      return state;
  }
};

export default passengersReducer;
