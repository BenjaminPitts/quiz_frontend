import React, { Component } from 'react'
import Quiz from './components/Quiz'
import axios from 'axios'

class App extends Component {
  state = {
    question: '',
    answer: '',
    answer_char: '',
    point_value: '',
    quiz: [],
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
          quiz: response.data,
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
        console.log(response)
          if(answer) {
            this.setState({
              showAnswer:false,
              quiz: response.data[0]
            })
          } else {
            this.setState({
              showAnswer:true,
              quiz: response.data[0]
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
      <input type='submit' value='Create Question' />
      </form>



<div className='quiz'>
  {this.state.quiz.map((quiz) => {
    return  <Quiz quiz={quiz} key={quiz.id}
    updateQuestion={this.updateQuestion}
    deleteQuestion={this.deleteQuestion}
    handleChange={this.handleChange}
    showAnswer={this.showAnswer}
    isTrue={this.props.isTrue}
    />
})}

<button value={this._id} onClick={this.showAnswer}>
Show Answer</button>
<br />
<h4>{ this.state.showAnswer ? 'Answer: ' + this.state.answer : null }</h4>

      </div>
    </div>
</div>
    )
  }
}


export default App;
