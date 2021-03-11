import React from "react";
import {
  sumHoverActionCreator,
} from "../redux/matrixReducer";
import { connect } from "react-redux";

const SumCeil = ({sumHover,index,sum}) => {
  // console.log("SumCeil ", props);
  const handler = (e) =>{
    sumHover(+e.target.attributes.dataid.value);
  }
  return (
    <div onMouseOver={(e)=>handler(e)} dataid={index} className="matrix-cell cell-amount">{sum[index]}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    sum: state.matrixPage.sum,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sumHover: (data) => {
      dispatch(sumHoverActionCreator(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SumCeil);