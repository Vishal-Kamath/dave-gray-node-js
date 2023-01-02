// How node differs from from vanilla js
// 1) Node runs on a server - not in a Browser (backend not frontend)
// 2) therefore the console is in the terminal window


// console.log('Hello World') // run node server in terminal - prints > Hello World 


// type Node in the terminal and you you will be running the console in the termianl
// this console is also called REPL - ( Read, Eval, Print, Loop)
// 3) Another difference between node and vanilla javascript is that in node there is a global object instead of a widow object


// console.log(global);


// 4) Has Common Core modules that we will explore
// 5) CommanJS instaed of ES6 modules
// CommanJs use an require statment to import modules

// Common core module OS
// const os = require('os');
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname); // gives the directory name
// console.log(__filename); // gives the filename name


// Common core module path
// const path = require('path');
// console.log(path.dirname(__filename)); // directory name
// console.log(path.basename(__filename)); // base name
// console.log(path.extname(__filename)); // extension name

// console.log(path.parse(__filename)); // all
