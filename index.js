/*
 To be used for performance tuning.
 This module shows how much time is used in each code block to see where slow transactions come from.
 How to use:
 start();
 log("something");
 log("something else");
 stop();
 voila...
 */

var startPoint = 0,
  points = [],
  rollups = {},
  stopPoint = 0,
  totalTime = 0;

function log(name) {
  points.push({
    ts: new Date().getTime(),
    name: name,
    passed: 0,
    perc: 0
  });
}

function start() {
  console.log("Performance timer started");
  startPoint = new Date();
  points = [];
}

function stop() {
  stopPoint = new Date();
  totalTime = stopPoint.getTime() - startPoint.getTime();
  console.log("Performance timer stopped");
  process();
  show();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function process() {
  for (var c=0; c < (points || []).length; c++) {
    points[c].passed = c === 0 ? points[c].ts - startPoint.getTime() : points[c].ts - points[c-1].ts;
    points[c].perc = Math.round(points[c].passed / totalTime * 100);

    if (!rollups[points[c].name]) {
      rollups[points[c].name] = {
        passed: points[c].passed,
        count: 1
      };
    } else {
      rollups[points[c].name].passed = rollups[points[c].name].passed + points[c].passed;
      rollups[points[c].name].count++;
    }
  }
}

function show() {
  console.log("==========================================================================");
  console.log("Performance timer statistics");
  console.log("==========================================================================");
  console.log("Started at: " + startPoint.toISOString());
  console.log("Stopped at: " + stopPoint.toISOString());
  console.log("Total time: " + totalTime + "ms");
  console.log("Consolidated logs:");
  Object.keys(rollups || {}).forEach(showRollup);
  console.log("==========================================================================");
  console.log("App logs:");
  (points || []).forEach(showPoint);
  console.log("==========================================================================");
}

function showRollup(k) {
  var p = rollups[k];
  console.log(p.passed + "ms (" + Math.round(p.passed / totalTime * 100) + "%): " + k + " + (seen " + p.count + " times)");
}

function showPoint(p) {
  console.log(p.passed + "ms (" + p.perc + "%): " + p.name);
}

module.exports = {
  start: start,
  stop: stop,
  log: log
};
