import { useEffect, useReducer } from "react";
import axios from "axios"
export default function useApplicationData() {

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  
  switch (action.type) {
    case SET_DAY:
      return { ...state, day:action.value};

    case SET_APPLICATION_DATA:
      return {...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers};

    case SET_INTERVIEW: 

      const appointment = {
        ...state.appointments[action.id],
        interview:action.interview && {...action.interview}
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      let spotNum = 0;
      if(action.interview) {
        if(!state.appointments[action.id].interview){
          spotNum = -1;
        }
      } else {
        spotNum = 1;
      };
console.log(state.days);
      const days = state.days.map((day) => day.appointments.includes(action.id) ? {...day,spots: day.spots + spotNum} : day);
      return {...state,appointments,days};
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

  const [state, dispatch] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
 

  const setDay = day => dispatch({type: SET_DAY, value: day});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all) => { 
      dispatch({type: SET_APPLICATION_DATA, value:{days: all[0].data, appointments: all[1].data, interviewers: all[2].data}})
      
    })
  }, [])



  function bookInterview(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({type: SET_INTERVIEW, id, interview});
   
    })
  }

  function cancelInterview(id){
  
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null });
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}