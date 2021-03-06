import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  media: {
    height: 400,
    width: 500
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  }
})
)

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
      description: book.volumeInfo.description,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      bookId: book.id
    },
    console.log('posting to saved page', book))
      .then(() => {
        console.log('second posting')
        const books = bookState.books
        const booksFiltered = books.filter(tome => tome.id !== book.id)
        setBookState({ ...bookState, books: booksFiltered })
      })
      .catch(err => console.log(err))
  }

  return (
    <>
    <Container maxWidth="lg" className='container'>
      <FormControl fullWidth className={classes.margin} variant="outlined" onSubmit={bookState.handleSearchBook}>
        <h1>Search Google Books</h1>
        <OutlinedInput
          id="outlined"
          label='search'
          name='search'
          placeholder="Enter title here"
          value={bookState.search}
          onChange={bookState.handleInputChange}
        />
      </FormControl>
      <Button
        variant='outlined'
        color='primary'
        onClick={bookState.handleSearchBook}
      >
          Search
      </Button>
      <br />
      <br />
          {
            bookState.books.map(book => {
              console.log(book.volumeInfo)
            
              
      return <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
                key={book.id}
      >
          <div className={classes.root}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={book.volumeInfo.imageLinks ? `${book.volumeInfo.imageLinks.thumbnail}` : 'Image unavailable'}
                      title={book.volumeInfo.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Title: {book.volumeInfo.title}
                      </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      Written by: {book.volumeInfo.authors}
                    </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        {book.volumeInfo.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size='small'
                      color='primary'
                      href={book.volumeInfo.infoLink}
                      target='_blank'
                    >
                      View
                    </Button>
                    <Button
                      size='small'
                      color='primary'
                      onClick={() => bookState.handleSaveBook(book)}
                    >
                      Save
                    </Button>
                  </CardActions>
                </Card>
        </div>
      </Grid>
})
          }
    </Container>
    </>
  )
}

export default Search
