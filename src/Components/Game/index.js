import React, { useState } from "react";
import "./index.css";
import Table from "../Table";
import { generateShipLocations, fire } from "./util";


const Game = () => {

  const [boardSize] = useState(7)
  const [numShips] = useState(3)
  const [shipLength] = useState(3)
  const [target, setTarget] = useState("")
  const [shipsSunk, setShipsSunk] = useState(0)
  const [guesses, setGuesses] = useState(0)
  const [message, setMessage] = useState("Sergiu Breban Battleship")
  const [ships, setShips] = useState(generateShipLocations(numShips, shipLength, boardSize))
  
  const hits = ships.reduce((acc, { hits }) => {
    return [...acc, ...hits]
  }, []).filter(s => s !== "")

  const playTurn = () => {
    let { newShips, message, shipSunk } = fire(ships, numShips, target)
    const newGuesses = guesses + 1

    if (shipSunk) {
      const newShipSunk = shipsSunk + 1

      if ((newShipSunk) === numShips) {
        message = "You sank all my battleships, in " + newGuesses + " guesses"
      }

      setShipsSunk(newShipSunk)
    }

    setGuesses(newGuesses)
    setShips(newShips)
    setMessage(message)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      playTurn()
    }
  }

  return (
    <div id="board">
      <h1 id="messageArea">{message}</h1>
      <form>
        <div className="input-group">
          <input type="text" onKeyDown={handleKeyDown} value={target} onChange={(e) => setTarget(e.target.value)} placeholder="A0" className="form-control" />
          <input type="button" onClick={playTurn} value="Fire!" className="btn btn-danger" />
        </div>
      </form>
      <Table hits={hits} boardSize={boardSize} />
    </div>
  )
}

export default Game