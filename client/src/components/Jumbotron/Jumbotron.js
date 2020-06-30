import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import books from './books.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'palevioletred',
    textAlign: 'center'
  },
  cover: {
    width: 500,
    height: 400,
    flexDirection: 'center'
  }
}))

const Jumbotron = () => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
              (React) Google Books Search
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
              Search for and save books of interest
          </Typography>
        </CardContent>
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
      <CardMedia
        className={classes.cover}
        image={books}
        title="books"
      />
      </Grid>
    </Card>
  )
}

export default Jumbotron
