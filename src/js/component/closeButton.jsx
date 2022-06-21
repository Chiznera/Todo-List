import React from "react";

const CloseButton = (props) => {
  return (
    <button className={`close ${props.specialClass}`} onClick={props.func}>
      {props.text}
    </button>
  );
};

export default CloseButton;
