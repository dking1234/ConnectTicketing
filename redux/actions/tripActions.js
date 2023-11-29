export const setTripDetails = (origin, destination, departureDate) => ({
    type: 'SET_TRIP_DETAILS',
    payload: { origin, destination, departureDate },
  });
  