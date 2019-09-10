import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



const { useVisualMode } = require("../../hooks/useVisualMode");

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";




export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview? SHOW: EMPTY
  );
   
  function save(name, interviewer) {
      const interview = {
      student: name,
      interviewer
     };
     transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(()=> transition(ERROR_SAVE, true));
  }

  function remove(id){
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() =>  transition(EMPTY))
    .catch(()=> transition(ERROR_DELETE, true));
  }

  function confirm(){
    transition(CONFIRM);
  }

  function edit(){
    transition(EDIT);
  }

  return (
  <article className="appointment" data-testid="appointment">
    <Header
    time={props.time}
    />
    {mode === ERROR_SAVE && <Error message="Error while saving" onClose={back} />}
    {mode === ERROR_DELETE && <Error message="Error while deleting" onClose={back} />}
    {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave= { save } onCancel={ ()=> { back() }}/> }
    {mode === CONFIRM && <Confirm onCancel={()=> back()} onConfirm={remove} />}
    {mode === DELETING && <Status message="Deleting" />}
    {mode === SAVING && <Status message="Saving" />}
    {mode === CREATE && <Form interviewers={props.interviewers} onSave= { save } onCancel={ ()=> { back() }}/> }
    {mode === EMPTY && <Empty onAdd={ ()=> { transition(CREATE)}} />}
    {mode === SHOW && (
      <Show
        id={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        onEdit={edit}
      />
    )}
    
  </article>
  )
}