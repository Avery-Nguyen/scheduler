import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewListElement = props.interviewers.map(interview => {
    return <InterviewerListItem 
    name={interview.name}
    avatar={interview.avatar}
    selected={interview.id === props.interviewer}
    setInterviewer={props.setInterviewer} />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewListElement}</ul>
    </section>
    );
}