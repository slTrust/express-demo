const express = require('express');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const pbkdf2Async = require('util').promisify(crypto.pbkdf2);

const router = express.Router();

const userRouter = require('./user');
const User = require('../../models/mongoose/user');

// 后续完成
router.post('/login', (req, res, next) => {
  (async () => {
    const { username, password } = req.body;
    const cipher = await crypto.pbkdf2(password, 'fdsafafds', 10000, 512, 'sha256');
    const created = await User.insert({ username, password: cipher });
  })()
    .then((r) => {
    })
    .catch((e) => {
    });
});

router.get('/login', (req, res) => {
  const { username } = req.query;
  const user = { username, expireAt: Date.now().valueOf() + (20 * 60 * 1000) };
  const token = JWT.sign(user, 'aaabbbccc');
  res.send(token);
});

router.get('/hello', async (req, res) => {
  const auth = req.get('Authorization');
  if (!auth) res.send('no auth');
  if (!auth.indexOf('Bearer') === -1) res.send('no auth');
  const token = auth.split('Bearer ')[1];
  const user = JWT.verify(token, 'aaabbbccc');
  if (user.expireAt < Date.now().valueOf()) res.send('token 过期');
  res.send(user);
});


router.use('/user', userRouter);

module.exports = router;
