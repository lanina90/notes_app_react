import React from 'react';

const TableComponent = ({headers, children}) => {
  return (
    <section>
      <table id="notes" className="notes">
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody id="notes-body">
        {children}
        </tbody>
      </table>
    </section>
  );
};

export default TableComponent;