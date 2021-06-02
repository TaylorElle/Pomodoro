import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import DurationSetting from "../DurationSetting";
import SessionInformation from "../SessionInformation";
import ControlPanel from "../ControlPanel";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

const BREAK_MAX = 15;
const BREAK_MIN = 1;
const BREAK_STEP = 1;

const FOCUS_MAX = 60;
const FOCUS_MIN = 5;
const FOCUS_STEP = 5;

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  const elapsedSeconds = prevState.timeTotal - timeRemaining;
  return {
    ...prevState,
    timeRemaining,
    percentComplete: (elapsedSeconds / prevState.timeTotal) * 100,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        duration: minutesToDuration(breakDuration),
        timeTotal: breakDuration * 60,
        timeRemaining: breakDuration * 60,
        percentComplete: 0,
      };
    }
    return {
      label: "Focusing",
      duration: minutesToDuration(focusDuration),
      timeTotal: focusDuration * 60,
      timeRemaining: focusDuration * 60,
      percentComplete: 0,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  //decrease focus
  function decreaseFocus() {
    setFocusDuration((prevState) =>
      Math.max(FOCUS_MIN, prevState - FOCUS_STEP)
    );
  }
  //increase focus
  function increaseFocus() {
    setFocusDuration((prevState) =>
      Math.min(FOCUS_MAX, prevState + FOCUS_STEP)
    );
  }
  //decrease break
  function decreaseBreak() {
    setBreakDuration((prevState) =>
      Math.max(BREAK_MIN, prevState - BREAK_STEP)
    );
  }
  //increase break
  function increaseBreak() {
    setBreakDuration((prevState) =>
      Math.min(BREAK_MAX, prevState + BREAK_STEP)
    );
  }

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
              duration: minutesToDuration(focusDuration),
              timeTotal: focusDuration * 60,
              percentComplete: 0,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  function stopSession() {
    setIsTimerRunning(false);
    setSession(null);
  }
  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <DurationSetting
            label={`Focus Duration: ${minutesToDuration(focusDuration)}`}
            onDecrease={decreaseFocus}
            onIncrease={increaseFocus}
            testid="focus"
          />
        </div>
        <div className="col">
          <div className="float-right">
            <DurationSetting
              label={`Break Duration: ${minutesToDuration(breakDuration)}`}
              onDecrease={decreaseBreak}
              onIncrease={increaseBreak}
              testid="break"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ControlPanel
            onPlayPause={playPause}
            isPlaying={isTimerRunning}
            onStop={stopSession}
          />
        </div>
      </div>
      <SessionInformation session={session} isPaused={!isTimerRunning} />
    </div>
  );
}

export default Pomodoro;
