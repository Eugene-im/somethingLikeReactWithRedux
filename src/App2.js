// import logo from './logo.svg';
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

const App2 = (props) => {
  const [isShown, setIsShown] = useState(false);
  // debugger;
  // let state = props.store.getState();
  console.log("props", props);
  // debugger;
  // console.log("state", state);
  // let numOfCol = '';
  let numOfCol = props.store.getNumOfCol();
  let numOfRow = props.store.getNumOfRow();
  let numOfHiglight = props.store.getNumOfHiglight();
  let inputM = React.createRef();
  let inputN = React.createRef();
  let inputX = React.createRef();
  // let ceil11 = React.createRef();
  // let ceilSum1 = React.createRef();
  // let add0 = React.createRef();
  // let rem0 = React.createRef();
  // let rowAdd = () => {
  //   let ceil = {};
  //   ceil.id = +add0.current.attributes.rowid.value;
  //   props.dispatch(rowAddActionCreator(ceil.id));
  // };
  // let rowRem = () => {
  //   let ceil = {};
  //   ceil.id = +rem0.current.attributes.rowid.value;
  //   props.dispatch(rowRemActionCreator(ceil.id));
  // };
  // let ceilClick = () => {
  //   let ceil = {};
  //   ceil.id = +ceil11.current.id;
  //   props.dispatch(ceilClickActionCreator(ceil.id));
  // };
  // let ceilHover = () => {
  //   let ceil = {};
  //   ceil.amount = +ceil11.current.innerText;
  //   props.dispatch(ceilHoverActionCreator(ceil.amount));
  // };
  // let sumHover = () => {
  //   console.log("need only to view");
  // };
  let updNumM = () => {
    let m = +inputM.current.value;
    props.dispatch(mnxUpdActionCreator({ what: "m", data: m }));
  };
  let updNumN = () => {
    let n = +inputM.current.value;
    props.dispatch(mnxUpdActionCreator({ what: "n", data: n }));
  };
  let updNumX = () => {
    let x = +inputM.current.value;
    props.dispatch(mnxUpdActionCreator({ what: "x", data: x }));
  };
  let generateMatrix = () => {
    let m = +inputM.current.value;
    let n = +inputN.current.value;
    let x = +inputX.current.value;
    console.log(m, n, x);
    setIsShown(true);
    props.dispatch(matrixGenActionCreator({ m, n, x }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Test app</h2>
      </header>
      <main className="App-main">
        <div className="app-input">
          <div className="input-group">
            <label className="input-label" htmlFor="col">
              Columns (M)
            </label>
            <input
              className="input-item"
              name="col"
              type="number"
              ref={inputM}
              onChange={updNumM}
              defaultValue={numOfCol}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="row">
              Rows (N)
            </label>
            <input
              className="input-item"
              name="row"
              type="number"
              ref={inputN}
              onChange={updNumN}
              defaultValue={numOfRow}
            />
          </div>
          <div className="input-group last">
            <label className="input-label" htmlFor="row">
              Number of cells with same amount (X)
            </label>
            <input
              className="input-item"
              name="row"
              type="number"
              ref={inputX}
              onChange={updNumX}
              defaultValue={numOfHiglight}
            />
          </div>
          <button className="input-button" onClick={generateMatrix}>
            Generate matrix
          </button>
        </div>
        <div className="app-output">
          {isShown && (
            <div className="output-matrix matrix">
              <MatrixRow state={props} />
              <div className="matrix-row row-1">
                {/* <div
                id="11"
                ref={ceil11}
                onMouseOver={ceilHover}
                onClick={ceilClick}
                className="matrix-cell cell-item cell-11"
              >
                100
              </div> */}
                <div className="matrix-cell cell-item cell-12">999</div>
                <div className="matrix-cell cell-item cell-13">555</div>
                <div
                  // ref={ceilSum1}
                  // onMouseOver={sumHover}
                  className="matrix-cell cell-amount"
                >
                  3
                </div>
                <button
                  // ref={add0}
                  // onClick={rowAdd}
                  rowid="0"
                  className="matrix-cell cell-row-add"
                >
                  +
                </button>
                <button
                  // ref={rem0}
                  // onClick={rowRem}
                  rowid="0"
                  className="matrix-cell cell-row-rem"
                >
                  -
                </button>
              </div>
              <div className="matrix-row row-2">
                <div className="matrix-cell cell-item cell-21">148</div>
                <div className="matrix-cell cell-item cell-22">547</div>
                <div className="matrix-cell cell-item cell-23">261</div>
                <div className="matrix-cell cell-amount">3</div>
              </div>
              <div className="matrix-row row-3">
                <div className="matrix-cell cell-item cell-31">7</div>
                <div className="matrix-cell cell-item cell-32">8</div>
                <div className="matrix-cell cell-item cell-33">9</div>
                <div className="matrix-cell cell-amount">3</div>
              </div>
              <div className="matrix-row average-row row-4">
                <div className="matrix-cell cell-average cell-x1">1</div>
                <div className="matrix-cell cell-average cell-x2">2</div>
                <div className="matrix-cell cell-average cell-x3">3</div>
              </div>
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

export default App2;
