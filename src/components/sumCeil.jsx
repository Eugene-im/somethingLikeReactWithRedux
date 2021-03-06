import React from "react";

const SumCeil = (props) => {
  console.log("SumCeil ", props);
  return (
    <div className="matrix-cell cell-amount">{props.data[props.index]}</div>
  );
};
export default SumCeil;
