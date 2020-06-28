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

  bookState.handleViewBook = book => {
    axios.get(`/api/books/${book._id}`)
      .then(() => {

      })
      .catch(err => console.error(err))
  }

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
  }, [])

  return (
    <div>
      {
        bookState.items.map(item => (
          <Card className={classes.root} key={item.id}>
            <CardHeader
              title={item.volumeInfo.title}
              subheader={item.volumeInfo.authors.length ? `Written by ${item.volumeInfo.authors}` : 'Author unknown'}
            />
            <CardMedia
              className={classes.media}
              image={item.volumeInfo.imageLinks.length ? `${item.volumeInfo.imageLinks}` : 'Image unavailable'}
              title={item.volumeInfo.title}
            />
            <CardActions>
              <Button
                size='small'
                color='primary'
                href={item.volumeInfo.infoLink}
              >
                View
              </Button>
              <Button
                size='small'
                color='secondary'
                onClick={() => bookState.handleDeleteBook(item)}
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
