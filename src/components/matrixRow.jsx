import MatrixCeil from "./matrixCeil";
import React, { useState }  from "react";
import {
  rowAddActionCreator,
  rowRemActionCreator,
  ceilClickActionCreator,
  ceilHoverActionCreator,
  mnxUpdActionCreator,
  matrixGenActionCreator,
} from "./redux/matrixReducer";

const MatrixRow = (props) => {
  let ceil11 = React.createRef();
  let ceilSum1 = React.createRef();
  let add0 = React.createRef();
  let rem0 = React.createRef();
console.log('props here',props);
debugger;
let matrixCeils;
if(props.state.state.matrix.data[0] !== 'undefined'){
    matrixCeils = props.state.state.matrix.data.map((ceil) => 
      console.log('ceil',ceil)
      // <MatrixCeil id={ceil.id}>{cail.amount}</MatrixCeil>
    );
}

  let ceilHover = () => {
    let ceil = {};
    ceil.amount = +ceil11.current.innerText;
    props.dispatch(ceilHoverActionCreator(ceil.amount));
  };
  let sumHover = () => {
    console.log("need only to view");
  };

  let rowAdd = () => {
    let ceil = {};
    ceil.id = +add0.current.attributes.rowid.value;
    props.dispatch(rowAddActionCreator(ceil.id));
  };
  let rowRem = () => {
    let ceil = {};
    ceil.id = +rem0.current.attributes.rowid.value;
    props.dispatch(rowRemActionCreator(ceil.id));
  };
  let ceilClick = () => {
    let ceil = {};
    ceil.id = +ceil11.current.id;
    props.dispatch(ceilClickActionCreator(ceil.id));
  };
  return (
    <div className="matrix-row row-1">
      {matrixCeils}
      <div
        id="11"
        ref={ceil11}
        onMouseOver={ceilHover}
        onClick={ceilClick}
        className="matrix-cell cell-item cell-11"
      >
        100
      </div>
      <div className="matrix-cell cell-item cell-12">999</div>
      <div className="matrix-cell cell-item cell-13">555</div>
      <div
        ref={ceilSum1}
        onMouseOver={sumHover}
        className="matrix-cell cell-amount"
      >
        3
      </div>
      <button
        ref={add0}
        onClick={rowAdd}
        rowid="0"
        className="matrix-cell cell-row-add"
      >
        +
      </button>
      <button
        ref={rem0}
        onClick={rowRem}
        rowid="0"
        className="matrix-cell cell-row-rem"
      >
        -
      </button>
    </div>
  );
};

export default MatrixRow;
