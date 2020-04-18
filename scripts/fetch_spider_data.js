require('../services/mongodb_connection');
const axios = require('axios');
const Spider = require('../models/mongoose/spider');
const logger = require('../utils/loggers/logger');
const Content = require('../models/mongoose/content');
const ESService = require('../services/es_service');

async function clearMongoContentData() {
  await Content.model.remove({})
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
}

// 不断从注册的服务上拉取数据
async function startFetchingProcess(spider) {
  // 每次都从头拉数据
  await clearMongoContentData()
    .catch((e) => {
      console.log(e);
    });

  const { contentList } = spider;
  let { latestId } = spider; // 上次爬取到哪了的标识
  // frequencyLimit 频率 一秒内调用多少次
  const { url, pageSizeLimit, frequencyLimit } = contentList;

  const actualPeriodMills = Math.ceil(1000 / frequencyLimit) * 2;

  async function fetch(startTime, lastId) {
    const list = await fetchingLists(url, lastId, pageSizeLimit);
    const upsertPromises = [];
    const wrappedContent = list.map((c) => {
      const wrapped = {
        spiderServiceId: spider._id,
        spiderServiceContentId: c.contentId,
        contentType: c.contentType,
        content: c.content,
        tags: c.tags,
        title: c.title,
      };
      upsertPromises.push(Content.model.findOneAndUpdate(
        { spiderServiceContentId: c.contentId },
        wrapped,
        {
          upsert: true,
          new: true,
        },
      ));
      return wrapped;
    });

    const insertedOrUpdatedList = await Promise.all(upsertPromises)
      .catch((e) => {
        logger.error(
          'error inserting spider service content to db',
          { err: e },
        );
      });

    latestId = wrappedContent[wrappedContent.length - 1].spiderServiceContentId;

    spider.lastestId = latestId;
    await spider.save();

    if (wrappedContent.length < pageSizeLimit) {
      return;
    }

    ESService.createOrUpdateContents(insertedOrUpdatedList);

    const endTime = Date.now().valueOf();
    const timePassed = endTime - startTime;

    const timeout = timePassed - actualPeriodMills < 0 ? actualPeriodMills -
      timePassed : 0;
    // 设置时间间隔
    setTimeout(() => {
      fetch(endTime, latestId)
        .catch((e) => {
          logger.error(
            'error fetching list data from spider service',
            {
              errMsg: e.message,
              errStack: e.stack,
            },
          );
        });
    }, timeout);
  }

  fetch()
    .catch((e) => {
      logger.error(
        'error fetching list data from spider service',
        {
          errMsg: e.message,
          errStack: e.stack,
        },
      );
    });
}

async function fetchingLists(url, latestId, pageSize) {
  const contentList = await axios.get(
    url,
    {
      params: {
        latestId,
        pageSize,
      },
    },
  )
    .then((res) => {
      if (!res.data || !res.data.contentList) {
        throw new Error('invalid response from spider service');
      }
      return res.data.contentList;
    })
    .catch((e) => {
      logger.error('error fetching content from spider', {
        errMsg: e.message,
        errStack: e.stack,
      });
    });
  return contentList;
}

async function initSpiders() {
  const spiders = await Spider.model.find({ status: 'validated' });
  for (let i = 0; i < spiders.length; i += 1) {
    const spider = spiders[i];
    startFetchingProcess(spider)
      .catch((e) => {
        logger.error(
          `error starting fetching process on spider ${spider._id}`,
          {
            errMsg: e.message,
            errStack: e.stack,
          },
        );
      });
  }
}

switch (process.argv[2] || 'fetch_data') {
  case 'fetch_data':
    initSpiders()
      .catch((e) => {
        logger.error(
          'error initializing spider processes',
          {
            errMsg: e.message,
            errStack: e.stack,
          },
        );
      });
    break;
  default:
    process.exit(0);
    break;
}
