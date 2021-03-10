import React, { useEffect } from "react";
import AverCeil from "./averCeil";

const MatrixRowAver = (props) => {
  // console.log("MatrixRowAver ", props);
  // const [averCeils, setAverCeils] = React.useState(props.aver);
  // useEffect(()=>setAverCeils(props.aver),[props.aver])

  return (
    <div key={props.index} className={`matrix-row average-row row-${props.index}`}>
      {props.aver.map((ceil, index) => (
        <AverCeil index={index} key={index} data={ceil} />
      ))}
    </div>
  );
};

export default MatrixRowAver;
