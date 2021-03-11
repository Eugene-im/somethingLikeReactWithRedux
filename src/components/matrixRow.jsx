import React, { useEffect, useState } from "react";
import MatrixCeil from "./matrixCeil";
import SumCeil from "./sumCeil";
import ButtonCeil from "./buttonCeil";
import { connect } from "react-redux";

const MatrixRow = ({ index, sum, row }) => {
  console.log("MatrixRow ROW", row);
  // const [rowData,setRow]=React.useState(row);
  // useEffect(()=>setRow(row),[row]);
  return (
    <div className={`matrix-row row-${index}`}>
      {row.map((ceil, i) => (
        <MatrixCeil key={ceil.id} matrixIndex={index.toString() + (i + 1).toString()} data={ceil} />
      ))}
      <SumCeil index={index} sum={sum}/>
      <ButtonCeil dataid={index} type='add' />
      <ButtonCeil dataid={index} type='rem' />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sum: state.matrixPage.sum,
    // data: state.matrixPage.data,
  };
};

export default connect(mapStateToProps, null)(MatrixRow);