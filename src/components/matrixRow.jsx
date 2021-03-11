import React from "react";
import MatrixCeil from "./matrixCeil";
import SumCeil from "./sumCeil";
import ButtonCeil from "./buttonCeil";
import { connect } from "react-redux";

const MatrixRow = ({ index, sum, row }) => {
  return (
    <div className={`matrix-row row-${index}`}>
      {row.map((ceil, i) => (
        <MatrixCeil key={ceil.id} index={index} matrixIndex={index.toString() + (i + 1).toString()} data={ceil} />
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
  };
};

export default connect(mapStateToProps, null)(MatrixRow);