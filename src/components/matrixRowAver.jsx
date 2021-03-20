import React from "react";
import AverCeil from "./averCeil";
import { connect } from "react-redux";

const MatrixRowAver = ({index,aver}) => {
  return (
    <div key={index+'d'} className={`matrix-row average-row row-${index}`}>
      {aver.map((ceil, index) => (
        <AverCeil index={index} key={index+'a'} data={ceil} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aver: state.matrixPage.aver,
  };
};


export default connect(mapStateToProps, null)(MatrixRowAver);