const express = require('express');

const router = express.Router();
const UserService = require('../services/user_service');
/* GET users listing. */
router.get('/', (req, res) => {
  res.locals.users = UserService.getAllUsers();
  res.render('users');
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const u = UserService.addNewUser(firstName, lastName, age);
  res.json(u);
});

router.get('/:userId', (req, res) => {
  const user = UserService.getUserById(Number(req.params.userId));
  res.locals.user = user;
  res.render('user');
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
