import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset(){
    setName("");
    setInterviewer(null);
  }
  function cancel(){
    reset();
   props.onCancel();
  }
  function validate(){
    if(name === ""){
      setError("student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name,interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value= {name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
            
            /*
          This must be a controlled component
        */
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appoinreset()">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}
