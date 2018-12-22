import React from 'react'
import moment from 'moment'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md'

const tableData = [
  {
    id: 0,
    type: 'buy',
    date: moment().startOf('hour').fromNow(),
    user: 'amadev',
    benefit: '23%',
  },
  {
    id: 1,
    type: 'buy',
    date: moment().endOf('day').fromNow(),
    user: 'amadev',
    benefit: '23%',
  },
  {
    id: 2,
    type: 'buy',
    date: moment().startOf('day').fromNow(),
    user: 'amadev',
    benefit: '23%',
  }
]

const SimplePlainTable = () => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn>#</TableColumn>
        <TableColumn>type</TableColumn>
        <TableColumn>date</TableColumn>
        <TableColumn>user</TableColumn>
        <TableColumn>benefit</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {tableData.map((data) => (
        <TableRow key={data.id}>
          <TableColumn>{data.id}</TableColumn>
          <TableColumn>{data.type}</TableColumn>
          <TableColumn>{data.date}</TableColumn>
          <TableColumn>{data.user}</TableColumn>
          <TableColumn>{data.benefit}</TableColumn>
        </TableRow>
      )).reverse()}
    </TableBody>
  </DataTable>
);

export default SimplePlainTable;
