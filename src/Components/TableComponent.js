import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategoryImage, trimText} from "../utils/helperFunctions";
import {
  removeNote,
  selectArchivedNotes,
  selectNotArchivedNotes,
  archivedNote,
  unArchivedNote, editNote
} from "../store/notesSlice";
import EditNoteComponent from "./Forms/EditNoteComponent";

const TableComponent = ({headers, showArchived}) => {
  const dispatch = useDispatch()
  const archivedNotes = useSelector(selectArchivedNotes);
  const notArchivedNotes = useSelector(selectNotArchivedNotes);
  const [editedNoteId, setEditedNoteId] = useState(null);

  const removeNoteHandler = (id) => {
    dispatch(removeNote(id))
  }

  const toggleNoteHandler = (id) => {
    if (showArchived) {
      dispatch(unArchivedNote(id));
    } else {
      dispatch(archivedNote(id));
    }
  };

  const notesToShow = showArchived ? archivedNotes : notArchivedNotes;

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
        {notesToShow.map((note) => (
          <tr key={note.id}>
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
            {showArchived ? (
                <td>
                  <div onClick={() => toggleNoteHandler(note.id)} className="pic unarchive"/>
                </td>
                  ) : (
             <>
               <td>
                 <div
                   onClick={() => setEditedNoteId(note.id)}
                   className="pic edit"/>
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
        ))}
        </tbody>
      </table>
      {editedNoteId && (
        <EditNoteComponent
          note={notArchivedNotes.find((note) => note.id === editedNoteId)}
          setEditedNoteId={() => setEditedNoteId(null)}
        />
      )}
    </section>
  );
};

export default TableComponent;