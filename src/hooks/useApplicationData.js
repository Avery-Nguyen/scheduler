import { useState, useEffect } from "react";
import axios from "axios"
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all) => { 
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data,interviewers: all[2].data }))
    })
    .catch(err => console.log(err));
  }, [])
  //add catch error


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // console.log(id, interview);
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
    // .catch(err => console.log(err));
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
    // .catch(err => console.log(err));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}