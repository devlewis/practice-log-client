// const AuthService = require("../auth/auth-service");

// const requireAuth = (req, res, next) => {
//   const knex = req.app.get("db");

//   const authToken = req.get("Authorization") || "";

//   let bearerToken;
//   if (!authToken.toLowerCase().startsWith("bearer")) {
//     return res.status(401).json({
//       error: `Missing bearer token`,
//     });
//   }

//   bearerToken = authToken.slice(authToken.indexOf(" ") + 1);

//   try {
//     const payload = AuthService.verifyJWT(bearerToken);

//     AuthService.getUserByUserName(knex, payload.sub)
//       .then((user) => {
//         if (!user) {
//           return res.status(401).json({
//             error: `Unauthorized request`,
//           });
//         }
//         req.user = user;
//         next();
//       })
//       .catch((err) => next(err));
//   } catch (error) {
//     return res.status(401).json({
//       error: `Unauthorized request`,
//     });
//   }
// };

// module.exports = requireAuth;
