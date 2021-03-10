import React, { useState } from "react";
import {
  mnxUpdActionCreator,
} from '../redux/matrixReducer'; 
import { connect } from "react-redux";

const InputGroup = (props) => {
  // console.log("InputGroup ", props);
  return (
    <div className={props.last ? "input-group last" : "input-group"}>
      <label className="input-label" htmlFor={props.htFor}>
        {props.label}
      </label>
      <input
        className="input-item"
        name={props.htFor}
        type={props.typeOfInput}
        defaultValue={props.data}
        // value={console.log("input ", this)}
        onChange={(e) => props.updM({ what: props.what, data: +e.target.value })}
      />
    </div>
  );
};

// need add logic to chhose num of coll

const mapStateToProps = (state) => {
  return {
    // matrixPage: state.matrixPage,
    // data: state.matrixPage.data,
    // dataOneDim: state.matrixPage.oneDimData,
    numOfCol: state.matrixPage.numOfCol,
    numOfRow: state.matrixPage.numOfRow,
    numOfHiglight: state.matrixPage.numOfHiglight,
    // sum: state.matrixPage.sum,
    // aver: state.matrixPage.aver,
    // sumHoverData: state.matrixPage.sumHoverData,
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
