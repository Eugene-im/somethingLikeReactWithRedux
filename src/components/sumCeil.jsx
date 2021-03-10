import React from "react";

const SumCeil = (props) => {
  console.log("SumCeil ", props);
  const handler = (e) =>{
    props.state.state.sumHover(+e.target.attributes.dataid.value);
  }
  return (
    <div onMouseOver={(e)=>handler(e)} dataid={props.index} className="matrix-cell cell-amount">{props.data[props.index]}</div>
  );
};
export default SumCeil;
