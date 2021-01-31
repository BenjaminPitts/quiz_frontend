import React, { Component } from 'react'

class Quiz extends Component {
  render = () => {
    return (
      <div className='update'>
          <h4>Question: {this.props.quiz.question}</h4>
          <h5>Answer: {this.props.quiz.answer}</h5>
        <form onSubmit={this.props.isTrue}>
          <label>Your Answer:</label>
          <input type='text' id={this.props.quiz.id} onChange={this.props.handleChange} />
          <input type='submit' value='Submit Answer' />
        </form>

        <details>
          <summary>Edit Question: </summary>
          <form id={this.props.quiz.id} onSubmit={this.props.updateQuestion}>
          <label htmlFor='question'>Q:</label>
          <br />
          <input type='text' id='question' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='age'>A:</label>
          <br />
          <input type='text' id='answer' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='answer_char'>A_char:</label>
          <input type='text' id='answer_char' onChange={this.props.handleChange} value={this.props.answer_char} />
          <br />
          <label htmlFor='point_value'>P:</label>
          <input type='text' id='point_value' onChange={this.props.handleChange} value={this.props.point_value} />
          <br />
          <input type='submit' value='Update Question' />
          <br />
          <button value={this.props.quiz.id} onClick={this.props.deleteQuestion}>
          DELETE QUESTION</button>

          </form>
        </details>
        <button value={this.props.quiz.id} onClick={this.props.showAnswer}>
        Show Answer</button>
        <br />

      </div>
    )
  }
}



export default Quiz
