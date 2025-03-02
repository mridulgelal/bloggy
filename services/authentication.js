const JWT = require("jsonwebtoken");
const {
  env: { JWT_SECRET },
} = require("process");

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
    fullName: user.fullName,
  };

  const token = JWT.sign(payload, JWT_SECRET);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, JWT_SECRET);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
