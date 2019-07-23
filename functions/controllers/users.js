module.exports.getUser = function(req, res, next) {
  res.json({ data: req.user });
}