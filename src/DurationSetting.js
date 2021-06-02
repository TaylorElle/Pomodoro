import React from "react";

function DurationSetting({ label, onDecrease, onIncrease, testid }) {
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid={`duration-${testid}`}>
        {/* TODO: Update this text to display the current focus session duration */}
        {label}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid={`decrease-${testid}`}
          onClick={onDecrease}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid={`increase-${testid}`}
          onClick={onIncrease}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default DurationSetting;
