const whitelist = [
  'https://www.youtube.com', 
  'http://localhost:3000', 
  'http://localhost:3000'
];  

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) { //inculded in white list or origin is undefined
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = corsOptions;