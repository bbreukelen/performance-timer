## Performance Timer

`performance-timer`, is a tiny class that allows you to debug code and see where the most time is consumed.  
After calling the stop method, a summary is provided with the defined steps and their consumed times.  

## Install

```
$ npm install performance-timer  
```

## Usage
```js
const pt = require('performance-timer');  
pt.start();
pt.log("Step 1 completed");
pt.log("Step 2 completed");
pt.stop();
```
