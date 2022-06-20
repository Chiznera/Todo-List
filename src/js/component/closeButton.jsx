import React from "react";

const CloseButton = (prop) => {
  return (
    <button className="close" onClick={prop.func}>
      X
    </button>
  );
};

export default CloseButton;
