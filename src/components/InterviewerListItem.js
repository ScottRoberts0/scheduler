import React from "react";
import "components/InterviewerListItem.scss";
let classnames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })
  
  return (
    <li 
    className={interviewerClass}
    key={props.id}
    selected={props.selected}
    onClick={props.setInterviewer}
    >
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
  );
}

