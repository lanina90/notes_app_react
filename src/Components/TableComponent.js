import React from 'react';
import {useSelector} from "react-redux";
import {trimText} from "../utils/helperFunctions";

const TableComponent = ({ headers}) => {

  const notes = useSelector(state=> state.notes.notes)

  return (
    <section>
      <table className="notes">
        <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {notes?.map((note) => (
            <tr key={note.id}>
            <td>{trimText(note.title, 20)}</td>
            <td>{note.created}</td>
            <td>{note.category}</td>
            <td>{note.content}</td>
            <td>{note.dates}</td>
            <td>
              {note.archived ? (
                <>
                  <button>Unarchive</button>
                  <button>Remove</button>
                </>
              ) : (
                <button>Archive</button>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableComponent;