import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function interviewers(props){
  
  const interviewerComponents = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
      selected = {interviewer.id === props.interviewer}
      name = {interviewer.name}
      avatar = {interviewer.avatar} />
  ));
 
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerComponents}</ul>
</section>

  }



