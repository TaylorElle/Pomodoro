import React from "react";

function ProgressBar({ percentComplete }) {
  return (
    <div className="progress" style={{ height: "20px" }}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="Percent complete"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percentComplete} // TODO: Increase aria-valuenow as elapsed time increases
        style={{ width: `${percentComplete}%` }} // TODO: Increase width % as elapsed time increases
      />
    </div>
  );
}

export default ProgressBar;
