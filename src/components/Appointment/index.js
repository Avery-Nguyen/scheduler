import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'
import Error from "components/Appointment/Error"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
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
    .catch(() => {
      transition(ERROR_SAVE, true)
    })
    
  }

  function destroy() {
    transition(CONFIRM);
  }

  function confirm(input = false){
    if(input) {
      transition(DELETING, true);
      props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
    }
  }

  


  return (
  <article className="appointment" data-testid="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={destroy}
        onEdit={() => {transition(EDIT);}}
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
    {mode === EDIT && (
      <Form
      interviewers={props.interviewers}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={() => {back()}}
      />)
    }
    {mode === ERROR_DELETE && (
      <Error 
      message={'could not cancel appointment'}
      onClose={() => {back()}}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error 
      message={'could not save appointment'}
      onClose={() => {back()}}
      />
    )}
  </article>
  );
 }