const User = require('../models/in_memo/user');
const Subscription = require('../models/in_memo/user');

module.exports.getAllUsers = function () {
  return User.list();
};

module.exports.addNewUser = function (firstName, lastName, age) {
  return User.insert(firstName, lastName, age);
};

module.exports.getUserById = function (userId) {
  return User.getOneById(userId);
};

module.exports.createSubScription = function (userId, url) {
  const user = User.getOneById(userId);
  if (!user) throw Error('no search user!');
  const sub = Subscription.insert(userId, url);
  return sub;
};
