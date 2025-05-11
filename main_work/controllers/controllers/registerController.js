module.exports = (req, res) => {
  let email = ''
  let username = ''
  let password = ''
  let confirmPassword = ''

  const data = req.flash('data')[0]

  if (typeof data !== 'undefined') {
    email = data.email
    username = data.username
    password = data.password
    confirmPassword = data.confirmPassword
  }

  res.render('register', {
    errors: req.flash('validationErrors'),
    email: email,
    username: username,
    password: password,
    confirmPassword: confirmPassword
  })
}