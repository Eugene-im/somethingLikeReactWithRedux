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

const App = (props) => {
  console.log("APP2 props", props);
  // const [rows, setRows] = React.useState(props.data);

  // const set = ()=>{
  //   const [rows, setRows] = React.useState(props.data);
  //   return (
  //     rows.map((row, index) => (
  //       <MatrixRow
  //         row={row}
  //         index={index}
  //         key={index}
  //         state={props.matrixPage}
  //       />
  //     ))
  //   )
  // };
  const [visible, setVisible] = React.useState(false);
  const hendler = () => {
    props.generateMatrix(props.matrixPage.numOfCol, props.matrixPage.numOfRow, props.matrixPage.numOfHiglight);
    setVisible(true);
    // setRows(props.data);
  }
  // const [inputM, setInputM] = useState(props.numOfCol);

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
            data={props.matrixPage.numOfCol}
            updM={props.updM}
          />
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Rows (N)"
            what="n"
            htFor="row"
            last={false}
            data={props.matrixPage.numOfRow}
            updM={props.updM}
          />
          <InputGroup
            state={props}
            typeOfInput={"number"}
            label="Light (X)"
            htFor="light"
            what="x"
            last={true}
            data={props.matrixPage.numOfHiglight}
            updM={props.updM}
          />
          <button className="input-button" onClick={() => hendler()}>Generate matrix</button>
        </div>
        <div className="app-output">
          {visible && (
            <div className="output-matrix matrix">
              {/* {visible ? set():''} */}
              {props.data.map((row, index) => (
                <MatrixRow
                  row={row}
                  index={index}
                  key={index}
                  state={props.matrixPage}
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
      <footer className="App-footer">
        {/* <a href="http://" target="_blank" rel="noopener noreferrer">send notes</a> */}
      </footer>
    </div>
  );
};

export default App;
