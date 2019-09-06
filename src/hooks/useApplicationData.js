import { useEffect, useReducer } from "react";
const axios = require("axios");

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
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
      const days = state.days;

      
      for (let i = 0; i < days.length; i++) {
      
      
        if (days[i].name === state.day) {
          let numOfSpots = days[i].spots;
          if (action.interview === null) {
            days[i].spots = numOfSpots + 1;
          } else {
            
            if(days[i].appointments.includes(action.id)){
              //Do Nothing!
            }else{
              days[i].spots = numOfSpots - 1;
            }


          
          }
        }
      }

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

export function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    const url = "/api/appointments/" + id;
    return axios.put(url, { interview }).then(response => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  }

  function cancelInterview(id) {
    const url = "api/appointments/" + id;

    return axios.delete(url, { id }).then(response => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
