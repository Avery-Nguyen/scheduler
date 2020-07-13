import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewClass = classNames({
    "interviewers__item":true,
    "interviewers__item--selected": props.selected
  });
  
  const interviewImgClass = classNames({
    "interviewers__item-image":true,
    "interviewers__item-image--selected": props.selected
  });

  return (
    <li className={interviewClass} onClick={props.onChange}>
    <img
      className={interviewImgClass}
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  );
}