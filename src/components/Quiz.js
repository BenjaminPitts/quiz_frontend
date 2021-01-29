import React, { Component } from 'react'

class Quiz extends Component {
  render = () => {
    return (
    <>
          <div className='update'>
          <h4>Question: {this.props.quiz.question}</h4>
          <h5>Answer: {this.props.quiz.answer}</h5>

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
          <input type='submit' value='Update Question' />
          <br />
          <button value={this.props.quiz.id} onClick={this.props.deleteQuestion}>
          DELETE QUESTION</button>
          </form>
          </details>

          </div>
    </>
    )
  }
}



export default Quiz
