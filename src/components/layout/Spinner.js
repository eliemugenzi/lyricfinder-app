import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "grid",
        placeContent: "center"
      }}
    >
      <img
        src="https://loading.io/spinners/bluecat/index.blue-longcat-spinner.svg"
        alt="Loading..."
        height="100"
        width="100"
      />
    </div>
  );
};

export default Spinner;
