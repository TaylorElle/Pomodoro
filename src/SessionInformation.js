import React from "react";
import ProgressBar from "./ProgressBar";
import { secondsToDuration } from "./utils/duration";

function SessionInformation({ session, isPaused }) {
  if (session === null) return null;
  return (
    <section>
      {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
          <h2 data-testid="session-title">
            {`${session.label} for ${session.duration} minutes`}
          </h2>
          {/* TODO: Update message below correctly format the time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {` ${secondsToDuration(session.timeRemaining)} remaining`}
          </p>
          {isPaused && <h3>PAUSED</h3>}
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <ProgressBar percentComplete={session.percentComplete} />
        </div>
      </div>
    </section>
  );
}

export default SessionInformation;
