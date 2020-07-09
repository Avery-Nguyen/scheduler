import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    
  }

  function cancel() {
    transition(CONFIRM);
  }

  function confirm(input = false){
    if(input) {
      transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    });
    }
  }

  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={cancel}
      />
    )}
    {mode === CREATE && (
      <Form
      interviewers={props.interviewers}
      onSave={save}
      onCancel={() => {back()}}
      />
    )}
    {mode === SAVING && (<Status message={'Saving'} />)}
    {mode === DELETING && (<Status message={'Deleting'} />)}
    {mode === CONFIRM && (
      <Confirm
      message={"Are you sure you want to delete?"}
      onCancel={() => {back()}}
      onConfirm={confirm}
      />
    )}
  </article>
  );
 }