import React, { useEffect } from "react";
import {
  ceilClickActionCreator,
  ceilHoverActionCreator,
} from "../redux/matrixReducer";
import { connect } from "react-redux";

const MatrixCeil = ({ ceilClick, ceilHover, data, matrixIndex, index, sumHoverData,sameX }) => {
  // console.log("matrixceil sumHoverData", sumHoverData);
  console.log("matrixceil sameX", sameX);
  // const checkVis = () => (sumHoverData.hover === 'true') ? (sumHoverData.id === index) ? 'visible' : '' : '';
  // let [visible, setVisible] = React.useState(sumHoverData);
  // useEffect(() => setVisible((sumHoverData === index)),[sumHoverData]);
  const handler = (e) => {
    if (e.type === 'click') {
      ceilClick(e.target.id)
    } else if (e.type === 'mouseover') {
      ceilHover(+e.target.innerText)
    }
  }

  return (
    <div>
      <div
        id={data.id}
        key={data.id}
        onClick={(e) => handler(e)}
        onMouseOver={(e) => handler(e)}
        className={`matrix-cell cell-item cell-${matrixIndex} ${sumHoverData}`}>
        {data.amount}
      </div>
      <div className={`cell-item-hover ${sumHoverData}`}>{data.pr}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sumHoverData: state.matrixPage.sumHoverData,
    sameX: state.matrixPage.sameX,
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