import React from "react";

const ButtonCeil = (props) => {
  // console.log('ButtonCeil ',props);
  const handler = (e) => {
    if (props.type === "add"){
      props.state.rowAdd(+e.target.id);
    } else if (props.type === "rem") {
      props.state.rowRem(+e.target.id);
    }
  };
  return (
    <button
      onClick={(e) => handler(e)}
      id={props.index}
      className={`matrix-cell cell-row-${props.type === "add" ? "add" : "rem"}`}
    >
      {props.type === "add" ? "+" : "-"}
    </button>
  );
};
export default ButtonCeil;
