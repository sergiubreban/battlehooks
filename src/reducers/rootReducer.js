import { SetMessageAction, PlayTurnActionType, StartGameActionType, RestartGameActionType } from "../actions"

const initialstate = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  ships: [],
  message: 'Brb Battleship',
  guesses: 0,
  shipsSunk: 0
}

function rootReducer(state = initialstate, action) {
  console.log('ACTION: ', action.type)

  switch (action.type) {
    case PlayTurnActionType: {
      let { ships, message, shipSunk } = fire(action.payload, state)
      const guesses = state.guesses + 1
      let { shipsSunk } = state

      if (shipSunk) {
        shipsSunk++

        if (shipsSunk === state.numShips) {
          message = "You sank all my battleships, in " + guesses + " guesses"
        }
      }

      return { ...state, shipsSunk, message, ships, guesses }
    }

    case SetMessageAction.type:
      return { ...state }

    case StartGameActionType: {
      const ships = generateShipLocations(state)

      return { ...state, ships }
    }

    case RestartGameActionType: {
      const newState = { ...state, ...action.payload }
      const ships = generateShipLocations(newState)

      return { ...newState, ships }
    }

    default:
      return state
  }
}

const collision = function (locations, ships) {
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i]
    for (let j = 0; j < locations.length; j++) {
      if (ship.locations.indexOf(locations[j]) >= 0) {
        return true
      }
    }
  }
  return false
}

const generateShip = function (shipLength, boardSize) {
  let direction = Math.floor(Math.random() * 2)
  let row, col

  if (direction === 1) { // horizontal
    row = Math.floor(Math.random() * boardSize)
    col = Math.floor(Math.random() * (boardSize - shipLength + 1))
  } else { // vertical
    row = Math.floor(Math.random() * (boardSize - shipLength + 1))
    col = Math.floor(Math.random() * boardSize)
  }

  let newShipLocations = []

  for (let i = 0; i < shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(row + "" + (col + i))
    } else {
      newShipLocations.push((row + i) + "" + col)
    }
  }
  return newShipLocations
}

const generateShipLocations = ({ numShips, shipLength, boardSize }) => {
  let locations

  const ships = []

  for (let i = 0; i < numShips; i++) {
    do {
      locations = generateShip(shipLength, boardSize)
    } while (collision(locations, ships))
    ships[i] = {
      locations,
      hits: (new Array(shipLength)).fill("")
    }
  }

  return ships
}

const isSunk = function ({ hits }) {
  for (let i = 0; i < hits.length; i++) {
    if (hits[i] === "") {
      return false
    }
  }
  return true
}

const fire = (target, { ships, numShips }) => {
  const newShips = [...ships]
  let message = ''
  let shipSunk = false

  for (let i = 0; i < numShips; i++) {
    let ship = newShips[i]
    let index = ship.locations.indexOf(target)

    // check if a ship location has already been hit
    if (ship.hits[index] === target) {
      message = "Oops, you already hit that location"
      break
    } else if (index >= 0) {
      ship.hits[index] = target
      message = "HIT!"

      if (isSunk(ship)) {
        message = "You sank my battleship!"
        shipSunk = true
      }
      break

    }
    message = "You Missed"
  }

  return {
    ships: newShips,
    message,
    shipSunk
  }
}

export default rootReducer