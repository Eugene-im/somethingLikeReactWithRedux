import React, { useEffect, useState } from "react";
import "./App.scss";
import MatrixRow from "./components/matrixRow";
import MatrixRowAver from "./components/matrixRowAver";
import InputGroup from "./components/inputGroup";
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

const App = (props) => {
  console.log("APP2 props", props);
  const [rows, setRows] = React.useState(props.data);
  const [visible, setVisible] = React.useState(false);
  useEffect(() => setRows(props.data), [props.data]);
  const handler = () => {
    props.generateMatrix(
      props.matrixPage.numOfCol,
      props.matrixPage.numOfRow,
      props.matrixPage.numOfHiglight
    );
    setVisible(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Test app</h2>
      </header>
      <main className="App-main">
        <div className="app-input">
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Columns (M)"
            htFor="col"
            what="m"
            last={false}
            data={props.numOfCol}
            // updM={props.updM}
          />
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Rows (N)"
            what="n"
            htFor="row"
            last={false}
            data={props.numOfRow}
            // updM={props.updM}
          />
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Light (X)"
            htFor="light"
            what="x"
            last={true}
            data={props.numOfHiglight}
            // updM={props.updM}
          />
          <button className="input-button" onClick={() => handler()}>
            Generate matrix
          </button>
        </div>
        <div className="app-output">
          {visible && (
          <div className="output-matrix matrix">
            {rows.map((row, index) => (
              <MatrixRow
                row={row}
                index={index}
                key={index}
                state={props.matrixPage}
                rowAdd={props.rowAdd}
                rowRem={props.rowRem}
                state={props}
              />
            ))}
            <MatrixRowAver
              index={props.matrixPage.numOfCol + 1}
              aver={props.matrixPage.aver}
            />
          </div>
           )}
        </div>
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    // matrixPage: state.matrixPage,
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

// const mapDispatchToProps = {
//   mnxUpdActionCreator,
//   matrixGenActionCreator,
//   rowAddActionCreator,
//   rowRemActionCreator,
//   ceilClickActionCreator,
//   ceilHoverActionCreator,
//   sumHoverActionCreator
// }

export default connect(mapStateToProps, mapDispatchToProps)(App);