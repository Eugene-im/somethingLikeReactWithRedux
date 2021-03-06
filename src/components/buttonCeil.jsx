import React from "react";

const ButtonCeil = (props) => {
    console.log('ButtonCeil ',props);

  return (
    <button className={`matrix-cell cell-row-${props.type==='add'?'add':'rem'}`}>
      {props.type==='add'?'+':'-'}
    </button>
  );
};
export default ButtonCeil;
