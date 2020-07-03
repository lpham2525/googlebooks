const router = require('express').Router()
const { Book } = require('../models')

router.get('/books', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => console.error(err))
})

router.post('/books', (req, res) => {
  console.log('saving book:', req.body)
  Book.create(req.body)
    .then(book => res.json(book))
    .catch(err => {
      console.error(err)
      res.status(400).send({
        status: 'error',
        err
      })
    })
})

router.delete('/books/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

module.exports = router
