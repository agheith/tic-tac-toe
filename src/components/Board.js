import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      currentTurn : true,
      status : ''
    }
    this.resetGame = this.resetGame.bind(this);
  }

  handleClick(index) {
    let squares = this.state.squares.slice();
    if (this.findWinnder(squares) || squares[index]) {
        return;
    }
    squares[index] = this.state.currentTurn ? 'X' : 'O';
    this.setState({
      squares,
      currentTurn : !this.state.currentTurn,
    });
  }

  resetGame() {
    this.setState({
      squares : Array(9).fill(null),
      currentTurn : true
    })
  }

  findWinnder(squares) {
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for(let i = 0; i < winningCombos.length; i++) {
      let [a, b, c] = winningCombos[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquares() {
    let { squares } = this.state;
    return squares.map((square, index) =>
      <Square
        key = {index}
        value = {square}
        onClick = {() => this.handleClick(index)}
        reset= {this.reset}
      />
    )
  }

  render() {
   let { status, squares, currentTurn } = this.state;
   let winner = this.findWinnder(this.state.squares);
   if(winner) {
     status = `Winner is ${winner} 🎉`;
   } else if (squares.every(val => val)) {
     status = `It's a tie 😠`
   } else {
     status = `Next player is ${currentTurn ? '❌' : '⭕'}`;
   }
   return (
     <div>
       <div className="status">
         {status}
         <button className="resetButton" onClick={this.resetGame}>Restart Game</button>
       </div>
       <div className="board">
         {this.renderSquares()}
       </div>
     </div>
   );
 }
}

export default Board;
