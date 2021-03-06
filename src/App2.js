import React, { useState } from "react";
import {
  rowAddActionCreator,
  rowRemActionCreator,
  ceilClickActionCreator,
  ceilHoverActionCreator,
  mnxUpdActionCreator,
  matrixGenActionCreator,
} from "./redux/matrixReducer";
import "./App.scss";
import MatrixRow from "./components/matrixRow";
import MatrixRowAver from "./components/matrixRowAver";
import InputGroup from "./components/inputGroup";

const App2 = (props) => {
  console.log("APP2 props", props);
  //   const [ceils, setCeils ] = React.useState(state.matrixPage.oneDimData)
  //   debugger;
  const [rows, setRows] = React.useState(props.state.matrixPage.data);
  const [inputM, setInputM] = useState(props.state.matrixPage.numOfCol);
  const updM = (data) => {
    // let m = +inputM.current.value;
    console.log('input ',data);
    // debugger
    props.dispatch(mnxUpdActionCreator({ what: "m", data: data }));
  };
//   const updNumN = () => {
//     let n = +inputM.current.value;
//     props.dispatch(mnxUpdActionCreator({ what: "n", data: n }));
//   };
//   const updNumX = () => {
//     let x = +inputM.current.value;
//     props.dispatch(mnxUpdActionCreator({ what: "x", data: x }));
//   };
//   let generateMatrix = () => {
//     let m = +inputM.current.value;
//     let n = +inputN.current.value;
//     let x = +inputX.current.value;
//     console.log(m, n, x);
//     setIsShown(true);
//     props.dispatch(matrixGenActionCreator({ m, n, x }));
//   };
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
            data={props.state.matrixPage.numOfCol}
            updM={updM}
          />
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Rows (N)"
            what="n"
            htFor="row"
            last={false}
            data={props.state.matrixPage.numOfRow}
          />
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Light (X)"
            htFor="light"
            what="x"
            last={true}
            data={props.state.matrixPage.numOfHiglight}
          />
          <button className="input-button">Generate matrix</button>
        </div>
        <div className="app-output">
          <div className="output-matrix matrix">
            {rows.map((row, index) => (
              <MatrixRow
                row={row}
                index={index}
                state={props.state.matrixPage}
              />
            ))}
            <MatrixRowAver
              index={props.state.matrixPage.numOfCol + 1}
              aver={props.state.matrixPage.aver}
            />
          </div>
        </div>
      </main>
      <footer className="App-footer">
        {/* <a href="http://" target="_blank" rel="noopener noreferrer">send notes</a> */}
      </footer>
    </div>
  );
};

export default App2;
