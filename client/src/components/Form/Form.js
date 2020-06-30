import React from 'react'
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'

const Form = () => {
  return (
    <>
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
    </>
  )
}

export default Form
