const scrypt = require('scrypt-kdf');
const {v4: uuid} = require('uuid');
const db = require('../db');

const ROLES = ['USER', 'ADMIN'];
const DEFAULT_PASSWORD = 'c2NyeXB0AA8AAAAIAAAAAdT1v/fOdILQAvKQlLX2thaMInLPwN7UGSkqrQOjdyZeeJgF+Jz7AAhDnaDWjjewaZ2PmzECZP68oRYa337UmNfSQXtC7NKC69oN+xZVSXj4';

let users;

db.get('users')
  .then(result => users = JSON.parse(result))
  .catch(() => {
    const id = uuid();
    users = {[id]: {id, name: 'admin', role: ROLES[1], password: DEFAULT_PASSWORD}}
  });

const hashPassword = password => scrypt.kdf(password, {logN: 15}).then(buffer => buffer.toString('base64'));

const verify = (name, password) => {
  const user = findByName(name);
  return user && user.password &&
    scrypt.verify(Buffer.from(user.password, 'base64'), password)
      .then(correct => correct && user);
};

const createUser = (name, password, role) => hashPassword(password)
  .then(password => ({id: uuid(), name, role, password}));

const getAllUsers = () => Object.values(users)
  .map(({id, name, role}) => ({id, name, role}))
  .sort((u1, u2) => u1.name.localeCompare(u2.name));
const getUser = id => users[id];
const findByName = name => Object.values(users).find(u => u.name === name);

const saveUser = user => {
  users[user.id] = user;
  return db.put('users', JSON.stringify(users))
    .then(() => user);
};

const deleteUser = id => delete users[id];

module.exports = {ROLES, getAllUsers, findByName, createUser, getUser, saveUser, deleteUser, hashPassword, verify};
