import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  // Prefer token from cookie, fall back to Authorization header or x-access-token header
  const cookieToken = req.cookies && req.cookies.token ? req.cookies.token : null;
  const headerToken = req.headers && (req.headers.authorization || req.headers['x-access-token']) ? (req.headers.authorization || req.headers['x-access-token']) : null;

  let token = cookieToken || headerToken || null;

  // If header contains a scheme (e.g. "Bearer <token>"), extract the token part.
  if (token && typeof token === 'string' && token.indexOf(' ') !== -1) {
    token = token.split(' ').pop();
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // debug: log presence of token (mask actual token for safety)
    try {
      const masked = token ? `${String(token).slice(0, 10)}...` : token;
      console.debug("[auth] token present:", !!token, "masked:", masked);
    } catch (e) {
      // ignore logging errors
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.error('[auth] token verification failed:', error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export default authUser