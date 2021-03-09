import React from "react";
import AverCeil from "./averCeil";

const MatrixRowAver = (props) => {
  // console.log("MatrixRowAver ", props);
  // debugger;
  const [averCeils, setAverCeils] = React.useState(props.aver);

  return (
    <div key={props.index} className={`matrix-row average-row row-${props.index}`}>
      {averCeils.map((ceil, index) => (
        <AverCeil index={index} key={index} data={ceil} />
      ))}
    </div>
  );
};

export default MatrixRowAver;
