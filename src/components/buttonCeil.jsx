import React from "react";
import {
  rowAddActionCreator,
  rowRemActionCreator,
} from "../redux/matrixReducer";
import { connect } from "react-redux";

const ButtonCeil = ({ rowAdd, rowRem, type, dataid, index }) => {
  // console.log('ButtonCeil ',props);
  const handler = (e) => {
    if (type === "add") {
      rowAdd(+e.target.attributes.dataid.value);
    } else if (type === "rem") {
      rowRem(+e.target.attributes.dataid.value);
    }
  };
  return (
    <button
      onClick={(e) => handler(e)}
      // key={index}
      dataid={dataid}
      className={`matrix-cell cell-row-${type === "add" ? "add" : "rem"}`}
    >
      {type === "add" ? "+" : "-"}
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCeil);