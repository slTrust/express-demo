const express = require('express');

const router = express.Router();

const adminRouter = require('./admin');
const userRouter = require('./user');
const UserService = require('../../services/user_service');

const apiRes = require('../../utils/api_response');

router.post('/login', (req, res, next) => {
  (async () => {
    const { username, password } = req.body;
    const result = await UserService.loginWithNamePass(username, password);
    return result;
  })()
    .then((r) => {
      res.data = r;
      apiRes(req, res);
    })
    .catch((e) => {
      next(e);
    });
});

router.use('/user', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
