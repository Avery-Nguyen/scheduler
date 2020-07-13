import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
// import PropTypes from 'prop-types'


export default function InterviewerList(props) {

  const interviewListElement = props.interviewers.map(value => {
    return <InterviewerListItem 
    key={value.id}
    name={value.name}
    avatar={value.avatar}
    selected={value.id === props.interviewer}
    onChange={event => props.setInterviewer(value.id)} />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewListElement}</ul>
    </section>
    );
}

// InterviewerList.propTypes = {
//   value: PropTypes.number,
//   onChange: PropTypes.func.isRequired
// };