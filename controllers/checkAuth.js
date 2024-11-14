const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token
      const token = authHeader.split(" ")[1];
      req.token = token; // Save it to request for later use
    } else {
      req.token = null; // Set to null if no valid bearer token is found
    }

    if (!req.token) {
      throw err();
    }
    // validate token
    const data = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
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
