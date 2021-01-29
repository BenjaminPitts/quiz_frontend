import React, { Component } from 'react'
import Quiz from './components/Quiz'
import axios from 'axios'

class App extends Component {
  state = {
    question: '',
    answer: '',
    quiz: [],
  }

  handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      axios.post('/quiz', this.state).then((response) => {
        this.getQuestion()
      })
    }

    updateQuestion = (event) => {
      event.preventDefault()
      event.target.reset()
      const id = event.target.id
      axios.put('/quiz/' + id, this.state).then((response) => {
        this.getQuestion()
      })
    }

    deleteQuestion = (event) => {
      axios.delete('/quiz/' + event.target.value).then((response) => {
        this.getQuestion()
      })
    }

    getQuestion = () => {
      axios
      .get('/quiz')
      .then(
        (response) => this.setState({
          quiz: response.data,
          question: '',
          choice1: '',
          choice2: '',
          choice3: '',
          answer: ''
        }),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
    }

    showAnswer=(event)=>{
      event.preventDefault()
      let answer = this.state.showAnswer
      axios.get('/quiz/' + event.target.id).then((response)=>{

          if(answer) {
            this.setState({
              showAnswer:false,
              quiz: response.data
            })
          } else {
            this.setState({
              showAnswer:true,
              quiz: response.data
            })
          }
      })
    }

    componentDidMount = () => {
      this.getQuestion()
    }

render = () => {
return (
<div className='container'>
  <div id='headerBar'>
    <div><h1>Coding Quiz</h1></div>
    <div></div>
    <div></div>
  </div>
  <div className='main'>
    <h2>Create New Question:</h2>
      <form onSubmit={this.handleSubmit}>
      <label htmlFor='question'>Q:</label>
      <input type='text' id='question' onChange={this.handleChange} value={this.state.Question} /><br />
      <label htmlFor='answer'>A:</label>
      <input type='text' id='answer' onChange={this.handleChange} value={this.state.answer} />
      <br />
      <input type='submit' value='Create Question' />
      </form>
        <button value={this._id} onClick={this.showAnswer}>
        Show Answer</button>
        <br />
        <br />
<h4>{ this.state.showAnswer ? 'Answer: ' + this.state.answer : null }</h4>

<div className='quiz'>

  {this.state.quiz.map((quiz) => {
    return  <Quiz quiz={quiz} key={quiz.id}
    updateQuestion={this.updateQuestion}
    deleteQuestion={this.deleteQuestion}
    handleChange={this.handleChange}
    showAnswer={this.showAnswer}
    />
})}
      </div>
    </div>
</div>

    )
    return  <Quiz />
  }
}


export default App;
