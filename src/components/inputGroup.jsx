import React, { useState } from "react";

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
export default InputGroup;
