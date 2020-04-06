import React from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from "carbon-components-react";

import { retrieveGamesData } from '../selectors';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader
  } = DataTable;


const headers = [
  {
    header: "Game Id",
    key: "Game_ID"
  },
  {
    header: "Game Start",
    key: "Game_Date"
  },
  {
    header: "Game End",
    key: "Game_End_Date"
  },
  {
    header: "Winner Id",
    key: "Contestants_Contestant_ID_Winner"
  },
];

const GamesTable = () => {
  const gamesData = useSelector(retrieveGamesData);
  gamesData.forEach((object, i) => object.id = (i + 1).toString());

  return(
    <DataTable
        rows={gamesData}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="Games Data">
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    // eslint-disable-next-line react/jsx-key
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
  
  )
};

export default GamesTable;
