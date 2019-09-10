export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      const days = state.days.map(day => {
        let numOfSpots = day.spots;
        if (day.name === state.day) {
          if (action.interview === null) {
            numOfSpots++;
          } else {
            if(!state.appointments[action.id].interview)
            numOfSpots--;
          }
          return { ...day, spots: numOfSpots };
        }
        return day;
      });

      const appointments = { ...state.appointments };
      appointments[action.id].interview = action.interview;
      return { ...state, appointments, days };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
