export function getAppointmentsForDay(state, day) {
  const dayToFind = day;
  const filteredDays = state.days.filter(day => day.name === dayToFind);

  const appointmentInfo = [];
  if (filteredDays && filteredDays.length) {
    const appointmentsArray = filteredDays[0].appointments;

    for (let appointment of appointmentsArray) {
      if (state.appointments[appointment]) {
        appointmentInfo.push(state.appointments[appointment]);
      }
    }
  }

  return appointmentInfo;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const dayToFind = day;
  const filteredDays = state.days.filter(day => day.name === dayToFind);
  const interviewersArray = [];

  if (filteredDays && filteredDays.length) {
    if (filteredDays[0].interviewers && filteredDays[0].interviewers.length) {
      const interviewersNumArray = filteredDays[0].interviewers;
     
      for (let interviewer of interviewersNumArray) {
        if (state.interviewers[interviewer]) {
          interviewersArray.push(state.interviewers[interviewer]);
        }
      }
   
    }
  }
  return interviewersArray;
}
