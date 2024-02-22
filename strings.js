const crypto = require('crypto');

// Generate a random string of bytes
const randomBytes = crypto.randomBytes(32);

// Convert the random bytes to a hexadecimal string
const randomString = randomBytes.toString('hex');

console.log(randomString);