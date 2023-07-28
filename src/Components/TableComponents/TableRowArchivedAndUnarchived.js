import React from 'react';
import {getCategoryImage, trimText} from "../../utils/helperFunctions";
import {archivedNote, removeNote, unArchivedNote} from "../../store/notesSlice";
import {useDispatch} from "react-redux";

const TableRowArchivedAndUnarchived = ({note, tableShowFor, setEditedNoteId}) => {

  const dispatch = useDispatch()
  const removeNoteHandler = (id) => {
    dispatch(removeNote(id))
  }

  const toggleNoteHandler = (id) => {
    if (tableShowFor === 'archived') {
      dispatch(unArchivedNote(id));
    } else {
      dispatch(archivedNote(id));
    }
  };

  return (
    <tr>
      <td>
        <div className="flex-container">
          <div className="category-image">
            <img src={getCategoryImage(note.category)} alt={note.category}/>
          </div>
          <div>{trimText(note.title, 20)}</div>
        </div>
      </td>
      <td>{note.created}</td>
      <td>{note.category}</td>
      <td>{trimText(note.content, 20)}</td>
      <td>{note.dates}</td>
      {tableShowFor === 'archived' ? (
        <td>
          <div onClick={() => toggleNoteHandler(note.id)} className="pic unarchive"/>
        </td>
      ) : (
        <>
          <td>
            <div onClick={() => setEditedNoteId(note.id)}  className="pic edit"/>
          </td>
          <td>
            <div onClick={() => toggleNoteHandler(note.id)} className="pic archive"/>
          </td>
          <td>
            <div onClick={() => removeNoteHandler(note.id)} className="pic remove"/>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRowArchivedAndUnarchived;