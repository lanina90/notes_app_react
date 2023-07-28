import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getCategoryImage, trimText} from "../../utils/helperFunctions";
import {
  selectArchivedNotes,
  selectNotArchivedNotes,
} from "../../store/notesSlice";
import EditNoteComponent from "../Forms/EditNoteComponent";
import TableRowArchivedAndUnarchived from "./TableRowArchivedAndUnarchived";

const TableComponent = ({headers, tableShowFor}) => {

  const notes = useSelector(state => state.notes.notes)
  const archivedNotes = useSelector(selectArchivedNotes);
  const notArchivedNotes = useSelector(selectNotArchivedNotes);
  const [editedNoteId, setEditedNoteId] = useState(null);
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    renderSummaryTable();
  }, [notes]);

  const renderSummaryTable = () => {
    const categoriesCount = notes.reduce((acc, note) => {
      const status = note.archived ? 'archived' : 'active';
      const category = note.category;

      acc[category] = acc[category] || {active: 0, archived: 0};
      acc[category][status]++;
      return acc;
    }, {});

    setSummaryData(categoriesCount);
  };

  const notesToShow = tableShowFor === 'unarchived' ? notArchivedNotes : archivedNotes;

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
        {tableShowFor === 'unarchived' || tableShowFor === 'archived' ?
          notesToShow.map((note) => (
           <TableRowArchivedAndUnarchived
             note={note}
             tableShowFor={tableShowFor}
             setEditedNoteId={setEditedNoteId}/>
          )) : null}

        {tableShowFor === 'summary' &&
          (
            Object.keys(summaryData).map((category) => (
              <tr key={category}>
                <td>
                  <div className="flex-container">
                    <div className="category-image">
                      <img src={getCategoryImage(category)} alt={category}/>
                    </div>
                    <div>{category}</div>
                  </div>
                </td>
                <td>{summaryData[category].active}</td>
                <td>{summaryData[category].archived}</td>
              </tr>
            ))
          )
        }
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