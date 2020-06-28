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
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
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
    axios.get(`/api/giphy/${bookState.search}`)
      .then(({ data }) => {
        console.log(data)
        setBookState({ ...bookState, books: data })
      })
      .catch(err => console.error(err))
  }

  bookState.handleSaveBook = book => {
    axios.post('/api/books', {
      title: book.title,
      source: book.images.original.url,
      url: book.url,
      author: book.username,
      bookId: book.id
    })
      .then(() => {
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
          label="Search Google Books"
          name="search"
          value={bookState.search}
          onChange={bookState.handleInputChange} />
        <Button
          variant="outlined"
          color="primary"
          onClick={bookState.handleSearchBook}
        >
          Search
        </Button>
      </form>
      <div>
        {
          bookState.books.map(item => (
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
                  size="small"
                  color="primary"
                  onClick={() => bookState.handleSaveBook(item)}
                >
                  Save
                </Button>
                <Button size="small" color="primary" href={item.volumeInfo.infoLink}>
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
