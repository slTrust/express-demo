const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true, index: 1 },
  age: { type: Number, max: 188, min: 0 },
});

const UserModel = mongoose.model('user', UserSchema);

async function insert(user) {
  const created = await UserModel.create(user);
  return created;
}

async function getOneById(id) {
  const user = await UserModel.findOne(id);
  return user;
}

async function getOneByName(name) {
  const user = await UserModel.findOne({ name });
  return user;
}

async function list(params) {
  const match = {};
  const flow = UserModel.find(match);
  const user = await flow.exec();
  return user;
}

module.exports = {
  insert,
  getOneById,
  getOneByName,
  list,
};
