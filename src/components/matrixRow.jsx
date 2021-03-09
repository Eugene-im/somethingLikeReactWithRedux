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

  return (
    <div className="matrix-row row-1">
      {props.row.map((ceil, index) => (
        <MatrixCeil state={props} key={props.id} index={index} data={ceil} />
      ))} 
      <SumCeil data={props.state.sum} index={props.index} />
      <ButtonCeil state={props} type='add'/>
      <ButtonCeil state={props} type='rem'/>
    </div>
  );
};

export default MatrixRow;