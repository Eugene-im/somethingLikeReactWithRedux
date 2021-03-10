import React, { useState } from "react";
import MatrixCeil from "./matrixCeil";
import SumCeil from "./sumCeil";
import ButtonCeil from "./buttonCeil";

const MatrixRow = (props) => {
  console.log("MatrixRow ", props);
  return (
    <div className={`matrix-row row-${props.index}`}>
      {props.row.map((ceil, index) => (
        <MatrixCeil state={props} key={ceil.id} matrixIndex={props.index.toString() + (index + 1).toString()} data={ceil} />
      ))}
      <SumCeil data={props.state.sum} state={props} index={props.index} />
      <ButtonCeil state={props} dataid={props.index} type='add' />
      <ButtonCeil state={props} dataid={props.index} type='rem' />
    </div>
  );
};

export default MatrixRow;