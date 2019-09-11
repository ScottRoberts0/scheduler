import { useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

const axios = require("axios");

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
