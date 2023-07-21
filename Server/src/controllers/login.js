const users = require("../utils/users");

const login = (req, res) => {
  const { email, password } = req.query;

  const userfound = users.find(
    (user) => user.email === email && user.password === password
  );
  return userfound
    ? res.status(200).json({ access: true })
    : res.status(404).json({ access: false });
};

module.exports = login;
