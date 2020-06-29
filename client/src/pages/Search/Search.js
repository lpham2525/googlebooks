import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
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

const Search = () => {
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    search: '',
    books: []
  })

  bookState.handleInputChange = event => {
    setBookState({ ...bookState, [event.target.name]: event.target.value })
  }

  bookState.handleSearchBook = event => {
    event.preventDefault()
    axios.get(`/api/books/${bookState.search}`)
      .then(({ data }) => {
        console.log(data)
        setBookState({ ...bookState, books: data })
      })
      .catch(err => console.error(err))
  }

  bookState.handleSaveBook = book => {
    axios.post('/api/books', {
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks.thumbnail,
      url: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      bookId: book.id
    },
    console.log('posting to saved page', book))
      .then(() => {
        console.log('posting')
        const books = bookState.books
        const booksFiltered = books.filter(tome => tome.id !== book.id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <form onSubmit={bookState.handleSearchBook}>
        <TextField
          label='Search Google Books'
          name='search'
          value={bookState.search}
          onChange={bookState.handleInputChange}
        />
        <Button
          variant='outlined'
          color='primary'
          onClick={bookState.handleSearchBook}
        >
          Search
        </Button>
      </form>
      <div>
        {
          bookState.books.map(book => (
            <Card className={classes.root} key={book.id}>
              <CardHeader
                title={book.volumeInfo.title}
                subheader={book.volumeInfo.authors.length ? `Written by ${book.volumeInfo.authors}` : 'Author unknown'}
              />
              <CardMedia
                className={classes.media}
                image={book.volumeInfo.imageLinks.thumbnail.length ? `${book.volumeInfo.imageLinks.thumbnail}` : 'Image unavailable'}
                title={book.volumeInfo.title}
              />
              <CardActions>
                <Button
                  size='small'
                  color='primary'
                  onClick={() => bookState.handleSaveBook(book)}
                >
                  Save
                </Button>
                <Button size='small' color='primary' href={book.volumeInfo.infoLink} target='_blank'>
                  View
                </Button>
              </CardActions>
            </Card>
          ))
        }
      </div>
    </>
  )
}

export default Search
