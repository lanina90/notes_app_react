import React, {FC} from 'react'
import {getCategoryImage, trimText} from "../../utils/helperFunctions"
import {NoteType, removeNote, toggleArchive} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"

type TableRowArchivedAndUnarchivedPropsType = {
  note: NoteType
  tableShowFor: string
  setEditedNoteId: ((open: number) => void)
}

const TableRowArchive: FC<TableRowArchivedAndUnarchivedPropsType> = ({
                                                                                     note,
                                                                                     tableShowFor,
                                                                                     setEditedNoteId
                                                                                   }) => {

  const dispatch = useAppDispatch()

  const removeNoteHandler = (id: number) => {
    dispatch(removeNote(id))
  }

  const openEditModal = () => {
    setEditedNoteId(note.id)
    document.body.classList.add('overflow-hidden')
    document.body.classList.add('relative')
  }

  return (
    <tr>
      <td>
        <div className="row-data rounded-l-lg">
          <div className="flex-container">
            <div className="category-image">
              <img style={{width: '20px'}}
                   src={getCategoryImage(note.category)}
                   alt={note.category}/>
            </div>
            <div>{trimText(note.title, 20)}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="row-data ">{note.created}</div>
      </td>
      <td>
        <div className="row-data">{note.category}</div>
      </td>
      <td>
        <div className="row-data">{trimText(note.content, 20)}</div>
      </td>
      <td>
        <div className="row-data">{note.dates}</div>
      </td>
      {tableShowFor === 'archived' ? (
        <td className='w-8'>
          <div className="row-data rounded-r-lg">
            <div onClick={() => dispatch(toggleArchive(note.id))}
                 className="w-7 h-7 bg-unarchive cursor-pointer"/>
          </div>
        </td>
      ) : (
        <>
          <td className='w-6'>
            <div className="row-data">
              <div onClick={openEditModal}
                   className="w-8 h-8 bg-edit cursor-pointer"/>
            </div>
          </td>
          <td className='w-6'>
            <div className="row-data">
              <div onClick={() => dispatch(toggleArchive(note.id))}
                   className="w-8 h-8 bg-archive cursor-pointer"/>
            </div>
          </td>
          <td className='w-6'>
            <div className="row-data rounded-r-lg">
              <div onClick={() => removeNoteHandler(note.id)}
                   className="w-8 h-7 bg-remove cursor-pointer"/>
            </div>
          </td>
        </>
      )}
    </tr>
  )
}

export default TableRowArchive