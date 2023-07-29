import React, {FC} from 'react'
import {getCategoryImage, trimText} from "../../utils/helperFunctions"
import {NoteType, removeNote, toggleArchive} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"

type TableRowArchivedAndUnarchivedPropsType = {
  note: NoteType
  tableShowFor: string
  setEditedNoteId: ((open: number) => void)
}

const TableRowArchivedAndUnarchived: FC<TableRowArchivedAndUnarchivedPropsType> = ({
                                                                                     note,
                                                                                     tableShowFor,
                                                                                     setEditedNoteId
                                                                                   }) => {

  const dispatch = useAppDispatch()

  const removeNoteHandler = (id: number) => {
    dispatch(removeNote(id))
  }

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
          <div onClick={() => dispatch(toggleArchive(note.id))} className="pic unarchive"/>
        </td>
      ) : (
        <>
          <td>
            <div onClick={() => setEditedNoteId(note.id)} className="pic edit"/>
          </td>
          <td>
            <div onClick={() => dispatch(toggleArchive(note.id))} className="pic archive"/>
          </td>
          <td>
            <div onClick={() => removeNoteHandler(note.id)} className="pic remove"/>
          </td>
        </>
      )}
    </tr>
  )
}

export default TableRowArchivedAndUnarchived