const Production = {
  logger: {
    path: '/var/logs/what_i_love',
  },
  mongo: {
    uri: 'mongodb://localhost:27017/what_i_love',
  },
  redis: {
    port: 6379,
    host: 'localhost',
  },
};

const Debug = {
  logger: {
    path: './logs/',
  },
  mongo: {
    uri: 'mongodb://localhost:27017/what_i_love',
  },
  redis: {
    port: 6379,
    host: 'localhost',
  },
};
if (process.NODE_ENV === 'production') {
  module.exports = Production;
} else {
  module.exports = Debug;
}
