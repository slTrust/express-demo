require("./services/mongodb_connection");
const es = require('./services/es_service');

es.searchByTag({
  tag: 'cos',
  page: 0,
  pageSize: 2,
})
  .then((r) => {
    console.log(JSON.stringify(r));
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
