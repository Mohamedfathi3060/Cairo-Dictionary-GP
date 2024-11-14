const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    // read token
    token = req.body.token;
    if (!token) {
      throw err();
    }
    // validate token
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // if VALIDATED
    if (!data) {
      throw err();
    }
    req.user = data.code;
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Not Authenticated",
    });
  }
};

exports.getToken = function (code) {
  const secret = process.env.JWT_SECRET_KEY;
  let token = jwt.sign(
    {
      code,
      //   committee,
      //   username,
      //   type,
    },
    secret,
    {
      expiresIn: "36h",
    }
  );
  return token;
};
