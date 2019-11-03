import React, { useEffect } from "react";
import Table from "./Table";
import { useSelector, useDispatch } from 'react-redux'
import { StartGameAction } from "../actions";
import UserPanel from "./UserPanel.js";


const Game = () => {
  const ships = useSelector(({ ships }) => ships)
  const boardSize = useSelector(({ boardSize }) => boardSize)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(StartGameAction())
  }, [],);

  const hits = ships.reduce((acc, { hits }) => {
    return [...acc, ...hits]
  }, []).filter(s => s !== "")
 
  return (
    <div id="board">
      <UserPanel />
      <Table hits={hits} boardSize={boardSize} />
    </div>
  )
}

export default Game