import jwt from "jsonwebtoken";

export const isLoggedIn = ((req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(400)
    throw new Error("Unauthorized user");
  }
  try {
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedData;
    next();
  } catch (err) {
    throw new Error("Unauthorized user");
  }
});