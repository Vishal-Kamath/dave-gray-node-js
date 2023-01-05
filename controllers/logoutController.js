const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {this.users = data}
};

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt; 

  // is refresh token in db
  const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secrure: true });
    return res.sendStatus(204);
  }

  // delete the refresh token
  const otherUser = usersDB.users.filter(person => person.refreshToken !== refreshToken);
  const currentUser = {...foundUser, refreshToken: ''};
  usersDB.setUsers([...otherUser, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'), 
    JSON.stringify(usersDB.users)
  );

  res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secrure: true }); // secure true - only serve on http
  res.sendStatus(204);
}

module.exports = {handleLogout};