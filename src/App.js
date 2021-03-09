import React, { useEffect, useState } from "react";
import "./App.scss";
import MatrixRow from "./components/matrixRow";
import MatrixRowAver from "./components/matrixRowAver";
import InputGroup from "./components/inputGroup";

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
          <button className="input-button" onClick={() => handler()}>
            Generate matrix
          </button>
        </div>
        <div className="app-output">
          {/* {visible && ( */}
          <div className="output-matrix matrix">
            {rows.map((row, index) => (
              <MatrixRow
                row={row}
                index={index}
                key={index}
                state={props.matrixPage}
                rowAdd={props.rowAdd}
                rowRem={props.rowRem}
              />
            ))}
            <MatrixRowAver
              index={props.matrixPage.numOfCol + 1}
              aver={props.matrixPage.aver}
            />
          </div>
          {/* )} */}
        </div>
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
};

export default App;
