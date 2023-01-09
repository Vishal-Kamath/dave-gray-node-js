import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://www.youtube.com'];

const node_env = process.env.NODE_ENV;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // if development allow undefined
    if (node_env === 'development' && origin === undefined) {
      return callback(null, true);
    }

    // else reject undefined
    if (origin === undefined) return callback(new Error('not allowed by CORS'));

    // check allowed
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
