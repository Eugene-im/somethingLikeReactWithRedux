import React, { useState } from "react";
import {
  mnxUpdActionCreator,
} from '../redux/matrixReducer';
import { connect } from "react-redux";

const InputGroup = ({ last, whatData, htFor, label, typeOfInput, updM, numOfCol, numOfRow, numOfHiglight }) => {
  // console.log("InputGroup ", whatData);
  const checkWhat = (whatData) => {
    switch (whatData) {
      case "m":
        return numOfCol;
      case "n":
        return numOfRow;
      case "x":
        return numOfHiglight;
      default:
        return console.error('check input what')
    }
  }
  return (
    <div className={last ? "input-group last" : "input-group"}>
      <label className="input-label" htmlFor={htFor}>
        {label}
      </label>
      <input
        className="input-item"
        name={htFor}
        type={typeOfInput}
        // defaultValue={checkWhat(whatData)}
        value={checkWhat(whatData)}
        onChange={(e) => updM({ what: whatData, data: +e.target.value })}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
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
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(InputGroup);
