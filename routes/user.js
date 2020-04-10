const express = require('express');

const router = express.Router();
const UserService = require('../services/user_service');
const HTTPReqParamError = require('../errors/http_request_param_error');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  (async () => {
    const users = await UserService.getAllUsers();
    res.locals.users = users;
  })()
    .then(() => {
      res.render('users');
    })
    .catch((e) => {
      next(e);
    });
});

router.post('/', (req, res) => {
  const { name, age } = req.body;
  const u = UserService.addNewUser(name, age);
  res.json(u);
});

router.get('/:userId', (req, res) => {
  (async () => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) throw new HTTPReqParamError('userId', '用户id不能为空', 'user id can not be emtpy');
    const user = UserService.getUserById(Number(userId));
    res.locals.user = user;
    res.render('user');
  })()
    .catch((e) => {
      console.log(e);
      res.json(e);
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

router.get('/:userId/subscription/:subscriptionId', (req, res) => {
  res.json({
    userId: req.params.userId,
    subscriptionId: req.params.subscriptionId,
  });
});

module.exports = router;
