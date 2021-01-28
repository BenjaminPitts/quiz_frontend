import React, { Component } from 'react'
import Person from './components/Quiz'
import axios from 'axios'

class App extends Component {
  state = {
    question: '',
    answer: [],
  }

render = () => {
return (
  <div className='container'>
  <h1>Hello!</h1>
  </div>
    )
  }
}


export default App;
