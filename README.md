# Pomodoro

"Build an interactice React application that uses buttons and timers, managing the state of the React application, and use state effectively over multiple components."

Built using JavaScript, HTML, CSS, React, and React Hooks

This project gave insight into how to refactor code from one file into many files with dynamic routing. 

For me, the hardest part was making an editable countdown that, when the user pressed play, would simultaneously show how much time was left.  

**Project rubric** 
All tests are passing in Qualified.
All props are treated as read-only.
Audio plays when the focus timer expires.
Audio plays when the break timer expires.
All state is updated using callbacks to avoid race conditions. Allowable exceptions are cases where the next state is not determined by the current state. For example, when disabling the timer, it is okay to just call setIsTimerRunning(false).
There are at least three components.
Each component has a single responsibility.
The main Pomodoro is free of any conditional display logic. This means that there aren't any if statements in the render function; each component determines its own visibility.
