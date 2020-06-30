import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Jumbotron from './components/Jumbotron'
import Search from './pages/Search'
import Saved from './pages/Saved'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Jumbotron />
        <Switch>
          <Route exact path='/'>
            <Search />
          </Route>
          <Route path='/saved'>
            <Saved />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
