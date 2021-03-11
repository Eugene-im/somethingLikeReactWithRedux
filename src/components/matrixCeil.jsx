import React from "react";
import {
  ceilClickActionCreator,
  ceilHoverActionCreator,
} from "../redux/matrixReducer";
import { connect } from "react-redux";

const MatrixCeil = ({ ceilClick, ceilHover, data, matrixIndex, index, sumHoverData }) => {
  console.log("matrixceil ceilData", data);
  const handler = (e) => {
    if (e.type === 'click') {
      ceilClick(e.target.id)
    } else if (e.type === 'mouseover') {
      ceilHover(+e.target.innerText)
    }
  }
  return (
    <div
      id={data.id}
      key={data.id}
      onClick={(e) => handler(e)}
      onMouseOver={(e) => handler(e)}
      className={`matrix-cell cell-item cell-${matrixIndex}`}>
      {data.amount}
      {sumHoverData.hover === 'true' && (sumHoverData.id === index) && (
        <div className="cell-item-hover">{data.pr}</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sumHoverData: state.matrixPage.sumHoverData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ceilClick: (data) => {
      dispatch(ceilClickActionCreator(data));
    },
    ceilHover: (data) => {
      dispatch(ceilHoverActionCreator(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixCeil);