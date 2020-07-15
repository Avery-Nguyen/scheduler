export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  
  switch (action.type) {
    case SET_DAY:
      return { ...state, day:action.value};

    case SET_APPLICATION_DATA:
      return {...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers};

    case SET_INTERVIEW: 

      const appointment = {
        ...state.appointments[action.id],
        // checks to see if interview is null - if not then send data to interview
        interview:action.interview && {...action.interview}
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      // update remaining spots client side
      let spotNum = 0;
      if(action.interview) {
        if(!state.appointments[action.id].interview){
          spotNum = -1;
        };
      } else {
        spotNum = 1;
      };
      //updates days array with new spots value based off of matching id
      const days = state.days.map((day) => day.appointments.includes(action.id) ? {...day,spots: day.spots + spotNum} : day);
      return {...state,appointments,days};
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
