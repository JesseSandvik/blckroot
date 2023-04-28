let users = [];

const addUser = (user) => {
  users = [...users, user];
};

module.exports = { users, addUser };
