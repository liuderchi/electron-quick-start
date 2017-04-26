// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log('renderer.js is loading')

// NOTE testing running node package bcrypt in Chromium
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(myPlaintextPassword, salt);

console.log('hash using bscript', hash);
