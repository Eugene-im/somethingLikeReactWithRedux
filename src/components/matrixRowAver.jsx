import React from "react";
import AverCeil from "./averCeil";
import { connect } from "react-redux";

const MatrixRowAver = ({index,aver}) => {
  return (
    <div key={index} className={`matrix-row average-row row-${index}`}>
      {aver.map((ceil, index) => (
        <AverCeil index={index} key={index} data={ceil} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aver: state.matrixPage.aver,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixRowAver);