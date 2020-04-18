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
  elasticsearch: {
    host: 'localhost:9200',
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
  elasticsearch: {
    host: 'localhost:9200',
  },
};
if (process.env.NODE_ENV === 'production') {
  module.exports = Production;
} else {
  module.exports = Debug;
}
