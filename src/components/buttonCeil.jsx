import React from "react";

const ButtonCeil = (props) => {
  console.log('ButtonCeil ',props);
  const handler = (e) => {
    if (props.type === "add"){
      props.state.rowAdd(+e.target.attributes.dataid.value);
    } else if (props.type === "rem") {
      props.state.rowRem(+e.target.attributes.dataid.value);
    }
  };
  return (
    <button
      onClick={(e) => handler(e)}
      // key={props.index}
      dataid={props.dataid}
      className={`matrix-cell cell-row-${props.type === "add" ? "add" : "rem"}`}
    >
      {props.type === "add" ? "+" : "-"}
    </button>
  );
};
export default ButtonCeil;
