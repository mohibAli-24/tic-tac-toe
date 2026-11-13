import { useState, useEffect } from "react";
import "./App.css";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { symbol: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  // Each queue holds { index, id } so we can track the specific move that placed a symbol.
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null); // { symbol, line }
  // Fading: tracks indices that were just removed (to animate out)
  const [fading, setFading] = useState([]);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const prevMoves = currentPlayer === "X" ? xMoves : oMoves;
    const updatedMoves = [...prevMoves, index];

    let removedIndex = null;
    if (updatedMoves.length > 3) {
      removedIndex = updatedMoves.shift();
      newBoard[removedIndex] = null;
    }

    // Update move history
    if (currentPlayer === "X") setXMoves(updatedMoves);
    else setOMoves(updatedMoves);

    setBoard(newBoard);

    // Handle fade-out for removed cell
    if (removedIndex !== null) {
      setFading((prev) => [...prev, removedIndex]);
      setTimeout(() => {
        setFading((prev) => prev.filter((i) => i !== removedIndex));
      }, 400);
    }

    // Check winner on the resulting board (after removal)
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXMoves([]);
    setOMoves([]);
    setCurrentPlayer("X");
    setWinner(null);
    setFading([]);
  };

  // Keyboard shortcut: R to reset
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "r" || e.key === "R") resetGame();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isWinningCell = (i) => winner?.line?.includes(i);

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <p className="subtitle">
        Two players · No draws · Oldest symbol fades after 3 turns
      </p>

      <div className="status">
        {winner ? (
          <span
            className={`winner-text ${winner.symbol === "X" ? "text-x" : "text-o"}`}
          >
            🎉 Player {winner.symbol} wins!
          </span>
        ) : (
          <span>
            Player{" "}
            <span className={currentPlayer === "X" ? "text-x" : "text-o"}>
              {currentPlayer}
            </span>
            's turn
          </span>
        )}
      </div>

      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            className={[
              "cell",
              cell === "X" ? "cell-x" : "",
              cell === "O" ? "cell-o" : "",
              isWinningCell(i) ? "winning" : "",
              fading.includes(i) ? "fading" : "",
            ].join(" ")}
            onClick={() => handleClick(i)}
            disabled={!!winner || !!cell}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        New Game
      </button>

      <p className="hint">
        Press <kbd>R</kbd> to restart anytime
      </p>
    </div>
  );
}
