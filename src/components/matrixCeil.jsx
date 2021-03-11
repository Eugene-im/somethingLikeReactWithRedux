import React, { useEffect } from "react";
import {
  ceilClickActionCreator,
  ceilHoverActionCreator,
  ceilUnHoverActionCreator,
} from "../redux/matrixReducer";
import { connect } from "react-redux";

const MatrixCeil = ({ ceilClick, ceilHover, ceilUnHover, data, matrixIndex, index, sumHoverData, sameX }) => {
  // console.log("matrixceil sumHoverData", sumHoverData);
  console.log("matrixceil sameX", sameX);
  // const checkVis = () => (sumHoverData.hover === 'true') ? (sumHoverData.id === index) ? 'visible' : '' : '';
  // let [visible, setVisible] = React.useState(sumHoverData);
  // useEffect(() => setVisible((sumHoverData === index)),[sumHoverData]);
  const handler = (e) => {
    if (e.type === 'click') {
      ceilClick(e.target.id)
    } else if (e.type === 'mouseenter') {
      ceilHover(+e.target.innerText)
    } else if (e.type === 'mouseleave') {
      ceilUnHover(+e.target.innerText)
    }
  }
  let visible = sumHoverData === index ? 'block' : 'none';
  let invisible = sumHoverData === index ? 'none' : 'block';
  let sameH = ([...sameX.filter((el) => el.id === data.id)].length) ? 'same' : ''
  return (
    <div
      id={data.id}
      key={data.id}
      onClick={(e) => handler(e)}
      onMouseEnter={(e) => handler(e)}
      onMouseLeave={(e) => handler(e)}
      className={`matrix-cell cell-item cell-${matrixIndex} ${sameH}`}>
      <div
        className={`cell-item-data`} style={{ display: invisible }}>
        {data.amount}
      </div>
      <div className={`cell-item-data-hover`} style={{ height: data.pr + '%', display: visible }}></div>
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
    ceilUnHover: (data) => {
      dispatch(ceilUnHoverActionCreator(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixCeil);