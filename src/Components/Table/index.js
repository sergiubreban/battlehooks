import React from "react";
import "./index.css";

const Cell = ({ id, hit }) => {
  return (
    <td id={`${id}${hit}`} className={hit ? 'hit' : ''}></td>
  )
}

const TableRow = ({ hits, index, length }) => {
  const cells = [];

  for (let i = 0; i < length; i++) {
    const id = `${index}${i}`;
    const hit = hits.includes(id);

    cells.push(<Cell key={id} id={id} hit={hit} />)
  }

  return (
    <React.Fragment>
      <tr>
        <td className="row_indicatior">
          <h1>{index}</h1>
        </td>
        {cells}
      </tr>
    </React.Fragment>
  )
}

const Table = ({ hits, boardSize }) => {
  const rows = [];
  const indicators = [<td key='column' className="column_indicatior"></td>];

  for (let i = 0; i < boardSize; i++) {
    indicators.push(<td key={i} className="column_indicatior">{i}</td>)
    rows.push(<TableRow hits={hits} key={`${i}${hits}`} index={i} length={boardSize} />);
  }

  return (
    <table>
      <tbody>
        <tr>
          {indicators}
        </tr>
        {rows}
      </tbody>
    </table>
  )
}

export default Table