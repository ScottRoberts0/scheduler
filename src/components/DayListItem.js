import React from "react";
import "components/DayListItem.scss";
let classnames = require('classnames');

const formatSpots = function(spot){
  let str = "";
  if(spot === 0){
    str = "no spots remaining";
  }
  if(spot === 1){
    str = "1 spot remaining";
  }
if(spot > 1){
  str = spot + " spots remaining";
}

  return str;
}


export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  




  return (
    <li 
    className={dayClass} 
    onClick={() => props.setDay(props.name)}
    selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}