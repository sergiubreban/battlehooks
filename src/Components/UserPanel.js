import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { PlayTurnAction, RestartGameAction, SetMessageAction } from "../actions";

const PlayerBoard = () => {
  const [target, setTarget] = useState('');
  const message = useSelector(({ message }) => message)
  const numShips = useSelector(({ numShips }) => numShips)
  const boardSize = useSelector(({ boardSize }) => boardSize)
  const shipLength = useSelector(({ shipLength }) => shipLength)
  const canPlayTurn = useSelector((state) => state.shipsSunk !== state.numShips)
  
  const dispatch = useDispatch()

  const playTurn = () => {
    if(canPlayTurn){
      dispatch(PlayTurnAction(target))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      playTurn()
    }
  }

  const handleInputChange = (e) => setTarget(e.target.value)

  return (
    <div>
      <div>
        <h3>Game info:</h3>
        <p>boardSize: {boardSize}</p>
        <p>numShips: {numShips}</p>
        <p>shipLength: {shipLength}</p>
      </div>
      <h1 id="messageArea">{message}</h1>
      <form>
        <div className="input-group">
          <input type="text" onKeyDown={handleKeyDown} onChange={handleInputChange} value={target} placeholder="00" className="form-control" />
          <input type="button" onClick={playTurn} value="Fire!" className="btn btn-danger" />
        </div>
      </form>
    </div>
  )
}

const UserPanel = () => {
  const dispatch = useDispatch()

  const restartGame = () => {
    var boardSize = parseInt(prompt("Please enter board size:", 7));
    var numShips = parseInt(prompt("Please enter ship no. :", 3));
    var shipLength = parseInt(prompt("Please enter ship length:", 3));

    if (isNaN(boardSize) || isNaN(numShips) || isNaN(shipLength)) {
      dispatch(SetMessageAction("All inputs needs to be numbers and > 0"))
    } else {
      dispatch(RestartGameAction({ boardSize, numShips, shipLength }))
    }
  }

  return (
    <div className='UserPanel'>
      <input type="button" onClick={restartGame} value="New game" className="btn btn-primary left btn-block" />
      <PlayerBoard />
    </div>
  )
}

export default UserPanel;