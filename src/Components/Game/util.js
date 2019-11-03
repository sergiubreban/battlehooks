
const collision = function (locations, ships) {
  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i];
    for (let j = 0; j < locations.length; j++) {
      if (ship.locations.indexOf(locations[j]) >= 0) {
        return true;
      }
    }
  }
  return false;
}

const generateShip = function (shipLength, boardSize) {
  let direction = Math.floor(Math.random() * 2);
  let row, col;

  if (direction === 1) { // horizontal
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * (boardSize - shipLength + 1));
  } else { // vertical
    row = Math.floor(Math.random() * (boardSize - shipLength + 1));
    col = Math.floor(Math.random() * boardSize);
  }

  let newShipLocations = [];

  for (let i = 0; i < shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(row + "" + (col + i));
    } else {
      newShipLocations.push((row + i) + "" + col);
    }
  }
  return newShipLocations;
};

exports.generateShipLocations = function (numShips, shipLength, boardSize) {
  let locations;

  const ships = [];

  for (let i = 0; i < numShips; i++) {
    do {
      locations = generateShip(shipLength, boardSize);
    } while (collision(locations, ships));
    ships[i] = {
      locations,
      hits: ["", "", ""]
    };
  }

  return ships;
};

exports.isSunk = function ({ hits }) {
  for (let i = 0; i < hits.length; i++) {
    if (hits[i] === "") {
      return false;
    }
  }
  return true;
};

exports.fire = (ships, numShips, target) => {
  const newShips = [...ships]
  let message = '';
  let shipSunk = false;

  for (let i = 0; i < numShips; i++) {
    let ship = newShips[i];
    let index = ship.locations.indexOf(target);

    // check if a ship location has already been hit
    if (ship.hits[index] === target) {
      message = "Oops, you already hit that location";
      break;
    } else if (index >= 0) {
      ship.hits[index] = target;
      message = "HIT!";

      if (this.isSunk(ship)) {
        message = "You sank my battleship!";
        shipSunk = true;
      }
      break;

    }
    message = "You Missed";
  }

  return {
    newShips,
    message,
    shipSunk
  };
}