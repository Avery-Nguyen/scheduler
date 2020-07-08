import React, { useState, useEffect } from "react";
import axios from "axios"
import Appointment from "components/Appointment"
import "components/Application.scss";
import DayList from "components/DayList";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "2pm",
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Bob Steve",
//       interviewer: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
//     }
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Avery Nguyen",
//       interviewer: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
//     }
//   }
// ];

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(() => {
  //   axios.get(`/api/days`).then((response) => {
  //     setDays(response.data)
  //   });
  // });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all) => { 
      setState(prev => ({...prev, days:all[0].data, appointments: all[1].data,interviewers: all[2].data }))
    });
  });
  
  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentElement = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList 
  days={state.days} 
  day={state.day} 
  setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentElement}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
