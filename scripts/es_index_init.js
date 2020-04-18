const es = require('../services/es_service').client;
const INDEX = 'what_i_love';
async function initWhatILoveIndex() {
  await es.indices.create({
    index: INDEX,
  });
  await es.indices.putMapping({
    index: INDEX,
    type: 'content',
    body: {
      properties: {
        tags: {
          type: 'nested',
          properties: {
            score: {
              type: 'float',
            },
            value: {
              type: 'text',
              fields: {
                keyword: {
                  type: 'keyword',
                  ignore_above: 256,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function clearEsIndex() {
  const res = await es.indices.delete({
    index: INDEX,
  });
  return res;
}

switch (process.argv[2]) {
  case 'init_what_i_love_index':
    initWhatILoveIndex()
      .then(() => {
        console.log('done');
        process.exit(0);
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
    break;
  case 'clear_es_index':
    clearEsIndex()
      .then(() => {
        console.log('done');
        process.exit(0);
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  default:
    process.exit(0);
    break;
}
