import React from "react";

import "../styles/dribbble-thumbnail.css";

export default function DribbbleThumbnail(props) {
  let source = props.src;
  console.log(source);
  return (
    <div
      className={"dribble-thumbnail " + props.className}
      style={props.style}
      onClick={props.onClick}
    >
      <img src={require("../" + source)} alt={props.alt} />
    </div>
  );
}
