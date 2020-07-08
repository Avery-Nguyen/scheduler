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

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }