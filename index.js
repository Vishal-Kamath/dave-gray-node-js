const {format} = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
console.log(uuid());


// npm update - to check update for all packages