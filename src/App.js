import React, { Component } from 'react'
import Quiz from './components/Quiz'
import axios from 'axios'

class App extends Component {
  state = {
    question: '',
    answer: '',
    answer_char: '',
    point_value: '',
    quizq: [],
  }

  handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      event.target.reset()
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
          quizq: response.data,
          question: '',
          answer: '',
          answer_char: '',
          point_value: ''
        }),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error))
    }

    showAnswer=(event)=>{
      event.preventDefault()
      let answer = this.state.showAnswer
      axios.get('/quiz/' + event.target.id).then((response)=>{

        console.log(response.data)
          if(answer) {
            this.setState({
              showAnswer:false,
              quiz_a: response.data[0].answer_char
            })
          } else {
            this.setState({
              showAnswer:true,
              quiz_a: response.data[0].answer_char
            })
          }

      })
    }

    isCorrect=()=>{
      return <div className='correct'>
      <h3>CORRECT!</h3>
      </div>
    }
    isIncorrect=()=>{
      return <div className='incorrect'>
      <h3>INCORRECT!</h3>
      </div>
    }

    isTrue=(event)=>{
      event.preventDefault()
      axios.get('/quiz/' + event.target.id).then((response)=>{
        console.log(event.target.value)
        if(this.state.answer === event.target.value) {
          this.isCorrect()
        } else {
          this.isIncorrect()
        }
      })
    }

    componentDidMount = () => {
      this.getQuestion()
    }

render = () => {
return (
<div className='container'>
  <h1>Coding Quiz</h1>
  <div className='main'>
    <h2>Create New Question:</h2>
      <form onSubmit={this.handleSubmit}>
      <label htmlFor='question'>Q:</label>
      <input type='text' id='question' onChange={this.handleChange} value={this.state.question} /><br />
      <label htmlFor='answer'>A:</label>
      <input type='text' id='answer' onChange={this.handleChange} value={this.state.answer} />
      <br />
      <label htmlFor='answer_char'>A_char:</label>
      <input type='text' id='answer_char' onChange={this.handleChange} value={this.state.answer_char} />
      <br />
      <label htmlFor='point_value'>P:</label>
      <input type='text' id='point_value' onChange={this.handleChange} value={this.state.point_value} />
      <br />
      <input type='submit' value='Create Question' />
      </form>



<div className='quiz'>
  {this.state.quizq.map((quiz) => {

    return  <Quiz quiz={quiz} key={quiz.id}
    updateQuestion={this.updateQuestion}
    deleteQuestion={this.deleteQuestion}
    handleChange={this.handleChange}
    showAnswer={this.showAnswer}
    isTrue={this.isTrue}
    />
})}

  <h4>{ this.state.showAnswer ? 'Answer: ' + this.state.quiz_a : null }</h4>

      </div>
    </div>
</div>
    )
  }
}


export default App;
