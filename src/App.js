import React, { Component } from 'react'
import Quiz from './components/Quiz'
import axios from 'axios'

class App extends Component {
  state = {
    question: '',
    answer: '',
    answer_char: '',
    point_value: '',
    input: '',
    correct: '',
    points: 0,
    quizq: [],
  }

  handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value,
        input: event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      axios.post('/quiz', this.state).then((response) => {
        console.log(response.data)
        this.setState({
          quizq: [response.data],
          question: response.data.question,
          answer: response.data.answer,
          answer_char: response.data.answer_char,
          point_value: parseInt(response.data.point_value)
        })
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
          quizq: response.data,
          question: response.data[0].question,
          answer: response.data[0].answer,
          answer_char: response.data[0].answer_char,
          point_value: parseInt(response.data[0].point_value)
        }),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
    }

    isCorrect=()=>{
      this.setState({
        correct:'CORRECT!'
      })
    }
    isIncorrect=(event)=>{

      this.setState({
        correct:'INCORRECT!'
      })
    }

    componentDidMount = () => {
      this.getQuestion()
    }

    scoreBoard=()=>{
      this.setState({
        points: this.state.points += this.state.point_value
      })
    }

    isTrue=(event)=>{
        console.log(this.state)
        if(this.state.answer_char === this.state.input.toUpperCase()) {
          this.isCorrect()
          this.scoreBoard()
          this.getQuestion()
          event.preventDefault()
        } else {
          this.isIncorrect()
          event.preventDefault()
          event.target.reset()
        }
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
  <details>
    <summary>Create New Question:</summary>
      <form onSubmit={this.handleSubmit}>
      <label htmlFor='question'>Enter Question:</label>
      <input type='text' id='question' onChange={this.handleChange} value={this.state.question} /><br />
      <label htmlFor='answer'>Enter Answer:</label>
      <input type='text' id='answer' onChange={this.handleChange} value={this.state.answer} />
      <br />
      <label htmlFor='answer_char'>Answer (A, B, C, D):</label>
      <input type='text' id='answer_char' onChange={this.handleChange} value={this.state.answer_char} />
      <br />
      <label htmlFor='point_value'>Point Value:</label>
      <input type='text' id='point_value' onChange={this.handleChange} value={this.state.point_value} />
      <br />
      <input type='submit' value='Create Question' />
      </form>
</details>

<h2>Points: {this.state.points}</h2>

<div className='quiz'>
  {this.state.quizq.map((quiz) => {

    return  <Quiz quiz={quiz} key={quiz.id}
    updateQuestion={this.updateQuestion}
    deleteQuestion={this.deleteQuestion}
    handleChange={this.handleChange}
    isTrue={this.isTrue}
    />
})}

<div className='correct'>
<h2>{this.state.correct}</h2>
</div>

      </div>
    </div>
</div>
    )

  }
}


export default App;
