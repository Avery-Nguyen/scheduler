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


