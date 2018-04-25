/*
 * File: /Users/michaelbeeson/Documents/VSCode/nodejs/event-loop/loop.js
 */

// start a node script
// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // Check 1: Any pending setTimeout, setInterval, setImmediate?
  // Check 2: Any pending OS tasks? (like server listenting to a port)
  // Check 3: Any pending long running operations? (like fs module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}
// Entire body executes in on 'tick'
while (shouldContinue()) {
  // 1. Node looks at pendingTimers and sees if any functions are ready to be called
  // if timer expired, node executes callbacks for timer (setTimout, setInterval)
  // 2. Node looks at pendingOSTasks and executes callbacks
  // 3. Node pauses execution. Continues when:
  //    - a new pendingOSTask is done
  //    - a new pendingOperation is done
  //    - a timer is about to complete
  // 4. Look at pendingTimers. Call any setImmediate
  // 5. Handle any 'close' events
  //    Example:
  //      readStream.on('close'), () => {
  //        console.log('Cleanup code');
  //      });
}

// exit back to terminal
