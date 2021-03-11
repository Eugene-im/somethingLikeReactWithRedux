import React from "react";

const AverCeil = (props) => {
  return <div className={`matrix-cell cell-average cell-x${props.index+1}`}>{props.data}</div>;
};
export default AverCeil;
