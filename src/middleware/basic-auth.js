function requireAuth(req, res, next) {
  console.log("requireAuth");
  console.log(req.get("Authorization"));
  next();
}

AuthService.getUserWithUserName(
    req.app.get('db'),
    tokenUserName
  )
    .then(user => {
      if (!user || user.password !== tokenPassword) {
        return res.status(401).json({ error: 'Unauthorized request' })
      }

    req.user = user
      next()
    })
    .catch(next)
}


module.exports = {
  requireAuth
};
