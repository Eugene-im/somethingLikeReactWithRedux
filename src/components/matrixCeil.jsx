import React from "react";

const MatrixCeil = (props) => {
  console.log("matrixceil ", props);
  const handler = (e) => {
    if (e.type === 'click') {
      props.state.state.ceilClick(e.target.id)
    } else if (e.type === 'mouseover') {
      props.state.state.ceilHover(+e.target.innerText)
    }
  }
  return (
    <div
      id={props.data.id}
      key={props.data.id}
      onClick={(e) => handler(e)}
      onMouseOver={(e) => handler(e)}
      className={`matrix-cell cell-item cell-${props.matrixIndex}`}>
      {props.data.amount}
      {/* {props.state.sate.sumHoverData.hover === 'true' && (props.state.sate.sumHoverData.id === props.state.index) && (
        <div className="cell-item-hover">{props.data.pr}</div>
      )} */}
    </div>
  );
};
export default MatrixCeil;
