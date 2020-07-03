import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

const Saved = () => {
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    books: []
  })

  bookState.handleDeleteBook = book => {
    axios.delete(`/api/books/${book._id}`)
      .then(() => {
        const books = JSON.parse(JSON.stringify(bookState.books))
        const booksFiltered = books.filter(tome => tome._id !== book._id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('/api/books')
      .then(({ data }) => {
        setBookState({ ...bookState, books: data })
      })
      .catch(err => console.error(err))
  })

  return (
    <div>
      {/* console.log(bookState.books) */}
      {
        bookState.books.map(book => (
          <Card className={classes.root} key={book.id}>
            <CardHeader
              title={book.title}
              subheader={book.authors ? `Written by ${book.authors}` : 'Author unknown'}
            />
            <CardMedia
              className={classes.media}
              image={book.image}
              title={book.title}
            />
            <CardActions>
              <Button
                size='small'
                color='primary'
                href={book.link}
                target='_blank'
              >
                View
              </Button>
              <Button
                size='small'
                color='secondary'
                onClick={() => bookState.handleDeleteBook(book)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  )
}

export default Saved
