import React from "react";
import "./App.scss";
import MatrixRow from "./components/matrixRow";
import MatrixRowAver from "./components/matrixRowAver";
import InputGroup from "./components/inputGroup";
import {
  mnxUpdActionCreator,
  matrixGenActionCreator,
} from "./redux/matrixReducer";
import { connect } from "react-redux";

const App = ({ numOfCol, numOfRow, numOfHiglight, data, generateMatrix}) => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => {
    generateMatrix(
      numOfCol,
      numOfRow,
      numOfHiglight
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
            typeOfInput={"number"}
            label="Columns (M)"
            htFor="col"
            whatData="m"
            last={false}
          />
          <InputGroup
            typeOfInput={"number"}
            label="Rows (N)"
            whatData="n"
            htFor="row"
            last={false}
          />
          <InputGroup
            typeOfInput={"number"}
            label="Light (X)"
            htFor="light"
            whatData="x"
            last={true}
          />
          <button className="input-button" onClick={() => handler()}>
            Generate matrix
          </button>
        </div>
        <div className="app-output">
          {visible && (
            <div className="output-matrix matrix">
              {data.map((row, index) => (
                <MatrixRow
                  row={row}
                  index={index}
                  key={index+'b'}
                />
              ))}
              <MatrixRowAver
                index={numOfCol + 1}
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
    data: state.matrixPage.data,
    dataOneDim: state.matrixPage.oneDimData,
    numOfCol: state.matrixPage.numOfCol,
    numOfRow: state.matrixPage.numOfRow,
    numOfHiglight: state.matrixPage.numOfHiglight,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updM: (data) => {
      dispatch(mnxUpdActionCreator({ what: "m", data: data }));
    },
    generateMatrix: (m, n, x) => {
      dispatch(matrixGenActionCreator({ m, n, x }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);