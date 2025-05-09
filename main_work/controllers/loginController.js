module.exports = (req, res) => {
  let email = ''
  let password = ''

  const data = req.flash('data')[0]
  if (typeof data !== 'undefined') {
    email = data.email
    password = data.password
  }

  res.render('login', {
    errors: req.flash('validationErrors'),
    email,
    password
  })
}
