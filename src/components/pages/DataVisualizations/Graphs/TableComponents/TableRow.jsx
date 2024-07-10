import React from 'react';
import TableInnerSquare from './TableInnerSquare';
import SubTable from './SubTable';

// TableRow component: Renders a single row in a table
// Handles both simple data (strings/numbers) and complex data (nested objects)
function TableRow(props) {
  const { columns, row, tableWidth, rowHeight } = props;
  // row should be an object with keys for each column
  // columns should be an array of column names

  return (
    <div
      className="table-row"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: tableWidth,
        overflow: 'hidden',
      }}
    >
      {columns.map((property, idx) => {
        if (row) {
          // Handle complex data (nested objects) with SubTable component
          if (typeof row[property] === 'object') {
            return (
              <SubTable
                dataObject={row[property]}
                rowHeight={rowHeight} // so for the SubTablesTable the row should be an object of objects
                key={idx}
              />
            );
          } else {
            // Handle simple data with TableInnerSquare component
            return (
              <div key={idx} style={{ overflow: 'hidden', flex: '1' }}>
                <TableInnerSquare
                  innerData={row[property]}
                  rowHeight={rowHeight}
                />
              </div>
            );
          }
        }
        return null; // Return null for empty rows
      })}
    </div>
  );
}

export default TableRow;
