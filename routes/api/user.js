const express = require('express');

const router = express.Router();
const UserService = require('../../services/user_service');
const apiRes = require('../../utils/api_response');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers();
    return {
      users,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/', (req, res, next) => {
  (async () => {
    const { name, age } = req.body;
    const user = UserService.addNewUser(name, age);
    return {
      user,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

router.get('/:userId', (req, res, next) => {
  (async () => {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    return {
      user,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});


router.post('/:userId/subscription', (req, res, next) => {
  try {
    const sub = UserService.createSubScription(Number(req.params.userId),req.body.url);
    res.json(sub);
  } catch (e) {
    next(e);
  }
});

router.get('/:userId/subscription/:subscriptionId', (req, res, next) => {
  (async () => {
    const { userId } = req.params;
    const sub = UserService.createSubscription(
      userId,
      req.body.url,
    );
    return {
      sub,
    };
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
