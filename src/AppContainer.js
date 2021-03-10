import App from "./App";
import {
  rowAddActionCreator,
  rowRemActionCreator,
  ceilClickActionCreator,
  ceilHoverActionCreator,
  sumHoverActionCreator,
  mnxUpdActionCreator,
  matrixGenActionCreator,
} from "./redux/matrixReducer";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    matrixPage: state.matrixPage,
    data: state.matrixPage.data,
    dataOneDim: state.matrixPage.oneDimData,
    numOfCol: state.matrixPage.numOfCol,
    numOfRow: state.matrixPage.numOfRow,
    numOfHiglight: state.matrixPage.numOfHiglight,
    sum: state.matrixPage.sum,
    aver: state.matrixPage.aver,
    sumHoverData: state.matrixPage.sumHoverData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updM: (data) => {
      dispatch(mnxUpdActionCreator({ what: "m", data: data }));
    },
    generateMatrix: (m,n,x) => {
      dispatch(matrixGenActionCreator({ m, n, x }));
    },
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
    sumHover: (data) => {
      dispatch(sumHoverActionCreator(data));
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
