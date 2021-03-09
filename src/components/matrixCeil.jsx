import React from "react";

const MatrixCeil = (props) => {
  console.log("matrixceil ", props);
  return (
    <div id={props.data.id} key={props.data.id} className="matrix-cell cell-item cell-11">
      {props.data.amount}
    </div>
  );
};
export default MatrixCeil;
