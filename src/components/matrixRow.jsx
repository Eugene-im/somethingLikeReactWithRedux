import React, { useState } from "react";
import {
  rowAddActionCreator,
  rowRemActionCreator,
  ceilClickActionCreator,
  ceilHoverActionCreator,
  mnxUpdActionCreator,
  matrixGenActionCreator,
} from "../redux/matrixReducer";
import MatrixCeil from "./matrixCeil";
import SumCeil from "./sumCeil";
import ButtonCeil from "./buttonCeil";

const MatrixRow = (props) => {
  console.log("MatrixRow ", props);
  const [matrixCeils, setMatrixCeils] = React.useState(props.row);

  return (
    <div className="matrix-row row-1">
      {matrixCeils.map((ceil, index) => (
        <MatrixCeil state={props} index={index} data={ceil} />
        ))}
      <SumCeil data={props.state.sum} index={props.index} />
      <ButtonCeil state={props} type='add'/>
      <ButtonCeil state={props} type='rem'/>
    </div>
  );
};

export default MatrixRow;