import React from 'react';

const TableRow = ({rowItems}) => {
  return (
    <tr>
      {Object.keys(rowItems).map((key, index) => {
        return (
          <td key={index}>
            {index === 0 ? rowItems[key].split('T')[0] : rowItems[key]}
          </td>
        )
      })}	
    </tr>
  );
}
 
export default React.memo(TableRow);
