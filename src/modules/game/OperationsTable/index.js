import React from 'react'
import moment from 'moment'
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md'

const SimplePlainTable = (props) => {
  const { tableData = [] } = props

  return (
    <DataTable plain>
      <TableHeader>
        <TableRow>
          <TableColumn>#</TableColumn>
          <TableColumn>type</TableColumn>
          <TableColumn>date</TableColumn>
          <TableColumn>user</TableColumn>
          <TableColumn>amount</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => (
          <TableRow key={data.id}>
            <TableColumn>{data.id}</TableColumn>
            <TableColumn>{data.type}</TableColumn>
            <TableColumn>{moment(data.date).fromNow()}</TableColumn>
            <TableColumn>{data.user}</TableColumn>
            <TableColumn>{data.amount}</TableColumn>
          </TableRow>
        )).reverse()}
      </TableBody>
    </DataTable>
  )
};

export default SimplePlainTable
