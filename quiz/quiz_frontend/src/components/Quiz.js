import React, { Component } from 'react'

class Quiz extends Component {
  render = () => {
    return (
      <div className='update'>
          <h3>question: {this.props.quiz.question}</h3>
          <h3>answer: {this.props.quiz.answer}</h3>
          <h5>pointValue: {this.props.quiz.point_value}</h5>
          <br />
          <br />
        <form onSubmit={this.props.isTrue}>
          <input type='text' id={this.props.quiz.id} onChange={this.props.handleChange} />
          <input type='submit' value='submitAnswer' />
        </form>
        <br />
        <details>
          <summary>editQuestion: </summary>
          <form id={this.props.quiz.id} onSubmit={this.props.updateQuestion}>
          <label htmlFor='question'>updateQuestion:</label>
          <input type='text' id='question' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='age'>choices(A,B,C,D):</label>
          <input type='text' id='answer' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='answer_char'>answer(A,B,C,D):</label>
          <input type='text' id='answer_char' onChange={this.props.handleChange} />
          <br />
          <label htmlFor='point_value'>pointValue:</label>
          <input type='text' id='point_value' onChange={this.props.handleChange} />
          <br />
          <input type='submit' value='updateQuestion' />
          <br />
          <br />
          <button value={this.props.quiz.id} onClick={this.props.deleteQuestion}>
          deleteQuestion</button>
          </form>
        </details>

      </div>
    )
  }
}



export default Quiz
