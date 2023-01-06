const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "user and password are required" });

  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401);

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles,
        },
      }, // Payload
      process.env.ACCESS_TOKEN_SECRET, // secret key
      { expiresIn: "30s" } // expire
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // saving refresh token with user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secrure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // jwt name of cookie / key
    // refreshTOken / value
    // set parameters such as
    // httpOnly: true - cannot be accessed by javascript
    // sameSite: 'None' - by default the cookie will be stored in the same site domain but very often the
    //                    the frontend and backend will have different site domains so the it will by default try to set the
    //                    on the backend domain but but none it can be set on other sites
    // secure: true - https only / will tranfer only on secure
    // maxAge: 24 * 60 * 60 * 1000 - hours * miniutes * seconds * milliseconds = 1day
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
