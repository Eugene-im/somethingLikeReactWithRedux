import React from "react";
import {
  sumHoverActionCreator,
  sumUnHoverActionCreator,
} from "../redux/matrixReducer";
import { connect } from "react-redux";

const SumCeil = ({ sumHover, sumUnHover, index, sum }) => {
  const handler = (e) => {
    if (e.type === 'mouseenter') {
      sumHover(+e.target.attributes.dataid.value);
    } else if (e.type === 'mouseleave') {
      sumUnHover(+e.target.attributes.dataid.value);
    }
  }
  return (
    <div onMouseEnter={(e) => handler(e)} onMouseLeave={(e) => handler(e)} dataid={index} className="matrix-cell cell-amount">{sum[index]}</div>
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
    sumUnHover: (data) => {
      dispatch(sumUnHoverActionCreator(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SumCeil);