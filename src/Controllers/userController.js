//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const config = require("config");
const authConfig = config.get("auth");

// Assigning users to the variable User
const User = db.users;

console.log("Authconfig is ", authConfig.secretKey);
//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, authConfig.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

// accessTokens
function generateAccessToken(user) {
    
  return jwt.sign({ id: user.id }, authConfig.secretKey, {
    expiresIn: 1 * 24 * 60 * 1000,
  });
}
// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ id: user.id }, authConfig.secretKey, {
    expiresIn: "60m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", accessToken, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log(accessToken);
        userData = {
            user,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
        
        console.log("user", JSON.stringify(user, null, 2));
        //send user data
        return res.status(201).send(userData);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserDetails = async (req) => {
  try {
    console.log(req.id);
    const user = await User.findOne({
      where: {
        id: req.id,
      },
    });
    console.log("user", JSON.stringify(user, null, 2));

    if (user) {
       return user;
    } else {
       return "No User Found";
    }
    
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  signup,
  login,
  getUserDetails,
};
