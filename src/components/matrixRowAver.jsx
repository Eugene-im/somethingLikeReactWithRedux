import React, { useState } from "react";
import {
  rowAddActionCreator,
  rowRemActionCreator,
  ceilClickActionCreator,
  ceilHoverActionCreator,
  mnxUpdActionCreator,
  matrixGenActionCreator,
} from "../redux/matrixReducer";
import AverCeil from "./averCeil";

const MatrixRowAver = (props) => {
  // console.log("MatrixRowAver ", props);
  // debugger;
  const [averCeils, setAverCeils] = React.useState(props.aver);

  return (
    <div className={`matrix-row average-row row-${props.index}`}>
      {averCeils.map((ceil, index) => (
        <AverCeil index={index} key={index} data={ceil} />
      ))}
    </div>
  );
};

export default MatrixRowAver;
