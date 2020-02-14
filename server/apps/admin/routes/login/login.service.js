const User = require('./../../../../libs/db/models/User')
const assert = require('http-assert')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function login(req, res) {
  const { username, password } = req.body
  assert(username, 422, '请填写用户名')
  assert(password, 422, '请填写密码')
  const user = await User.findOne({ username }).select('password')
  assert(user, 422, "用户不存在")
  const isValid = bcrypt.compareSync(password, user.password)
  assert(isValid, 422, '密码错误')
  const token = jwt.sign({ id: user._id }, req.app.get('SECRET'))
  res.send({ token });
}

module.exports = {
  login
}