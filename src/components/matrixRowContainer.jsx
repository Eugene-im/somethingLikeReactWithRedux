import MatrixRow from "./matrixRow";
import {
    rowAddActionCreator,
    rowRemActionCreator,
    ceilClickActionCreator,
    ceilHoverActionCreator,
    mnxUpdActionCreator,
    matrixGenActionCreator,
  } from "../redux/matrixReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    // debugger
  return {
    matrixPage: state.matrixPage,
    data: state.matrixPage.data,
    dataOneDim: state.matrixPage.oneDimData,
    numOfCol: state.matrixPage.numOfCol,
    numOfRow: state.matrixPage.numOfRow,
    numOfHiglight: state.matrixPage.numOfHiglight,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    rowAdd: (data) => {
      dispatch(rowAddActionCreator(data));
    },
    rowRem: (data) => {
      dispatch(rowRemActionCreator(data));
    },
    ceilClick: (data) => {
      dispatch(ceilClickActionCreator(data));
    },
    ceilHover: (data) => {
    //   ceil.amount = +ceil11.current.innerText;
      dispatch(ceilHoverActionCreator(data));
    },
    sumHover: () => {
      console.log("need only to view");
    },
  };
};
const MatrixRowContainer = connect(mapStateToProps, mapDispatchToProps)(MatrixRow);

export default MatrixRowContainer;