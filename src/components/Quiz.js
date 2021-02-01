import React, { Component } from 'react'

class Quiz extends Component {
  render = () => {
    return (
      <div className='update'>
          <h4>Question: {this.props.quiz.question}</h4>
          <h5>Answer: {this.props.quiz.answer}</h5>
          <h5>Point Value: {this.props.quiz.point_value}</h5>
        <form onSubmit={this.props.isTrue}>
          <input type='text' id={this.props.quiz.id} onChange={this.props.handleChange} />
          <input type='submit' value='Submit Answer' />
        </form>

        <details>
          <summary>Edit Question: </summary>
          <form id={this.props.quiz.id} onSubmit={this.props.updateQuestion}>
          <label htmlFor='question'>Question:</label>
          <br />
          <input type='text' id='question' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='age'>Answer:</label>
          <br />
          <input type='text' id='answer' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='answer_char'>Answer (A, B, C, D):</label>
          <br />
          <input type='text' id='answer_char' onChange={this.props.handleChange} value={this.props.answer_char} />
          <br />
          <label htmlFor='point_value'>Point Value:</label>
          <br />
          <input type='text' id='point_value' onChange={this.props.handleChange} value={this.props.point_value} />
          <br />
          <input type='submit' value='Update Question' />
          <br />
          <button value={this.props.quiz.id} onClick={this.props.deleteQuestion}>
          DELETE QUESTION</button>

          </form>
        </details>


      </div>
    )
  }
}



export default Quiz
