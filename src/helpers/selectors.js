export function getAppointmentsForDay(state, day) {

  const appointmentOfThatDay = [];
  for (const date of state.days) {
    if (date.name === day){
      for (const appointment of date.appointments) {
        appointmentOfThatDay.push(state.appointments[appointment]);
      };
    };
  };

  return appointmentOfThatDay;
};


export function getInterview(state, interview) {
  //appointment.interview (interview) is --> { student: 'Archie Cohen', interviewer: 2 }
  if(!interview) {
    return null;
  }
 
  const interviewObj = {
    ...interview,
    interviewer: {
      ...state.interviewers[interview.interviewer]
    }
  };
  return interviewObj;
};

export function getInterviewersForDay(state, day) {

  const interviewerOfThatDay = [];
  for (const date of state.days) {
    if (date.name === day){
      for (const interviewer of date.interviewers) {
        interviewerOfThatDay.push(state.interviewers[interviewer]);
      };
    };
  };

  return interviewerOfThatDay;
};