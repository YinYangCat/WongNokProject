const pool = require('../index.js') // 

module.exports = (req, res, next) => {
  const userId = req.session.userId

  if (!userId) {
    return res.redirect('/')
  }

  pool.query('SELECT * FROM users WHERE id = $1', [userId])
    .then(result => {
      if (result.rows.length === 0) {
        return res.redirect('/')
      }

      console.log('User logged in successfully')
      next()
    })
    .catch(err => {
      console.error(err)
      res.redirect('/')
    })
}
