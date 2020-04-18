### Express demo

#### 重要的事情说三遍

**如果是公司项目，千万别把数据库连接串，密钥等信息上传git**

**如果是公司项目，千万别把数据库连接串，密钥等信息上传git**

**如果是公司项目，千万别把数据库连接串，密钥等信息上传git**

setting.js

```
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
```

cipher/jwt_config.js

```
module.exports = {
  SECRET: 'fdafdsafasda',
  expireIn: 86400000,
}
```

cipher/password_config.js

```
module.exports = {
  SALT: 'fdsaflksdjfladsjl',
  ITERATIONS: 10000,
  KEY_LENGTH: 512,
  DIGEST: 'sha256',
}
```



