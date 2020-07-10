import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList (props) {
  const dayListElement = props.days.map(day => {
    return <DayListItem 
            key={day.id}
            name={day.name} 
            spots={day.spots} 
            //add conditional to take the state.spots or day.spots
            selected={day.name === props.day}
            setDay={props.setDay}  />
  });
 

  return (
  <ul>
    {dayListElement}
  </ul>
  );
};