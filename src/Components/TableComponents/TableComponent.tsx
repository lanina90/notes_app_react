import React, {FC, ReactNode, useEffect, useState} from 'react'
import {getCategoryImage} from "../../utils/helperFunctions"
import {NoteType} from "../../store/notesSlice"
import EditNoteComponent from "../Forms/EditNoteComponent"
import TableRowArchivedAndUnarchived from "./TableRowArchivedAndUnarchived"
import {useAppSelector} from "../../hooks"

type SummaryDataTypes = {
  [category: string]: {
    active: number
    archived: number
  }
}

type TableComponentPropsType = {
  headers: ReactNode[]
  tableShowFor: string
}

const TableComponent: FC<TableComponentPropsType> = ({headers, tableShowFor}) => {

  const notes = useAppSelector(state => state.notes.notes)
  const archivedNotes = useAppSelector(state => state.notes.notes.filter(note => note.archived))
  const notArchivedNotes = useAppSelector(state => state.notes.notes.filter(note => !note.archived))
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null)
  const [summaryData, setSummaryData] = useState<SummaryDataTypes>({})
  const noteToEdit = notArchivedNotes.find((note: NoteType) => note.id === editedNoteId)

  useEffect(() => {
    renderSummaryTable()
  }, [notes])

  const renderSummaryTable = () => {
    const categoriesCount = notes.reduce((acc: any, note) => {
      const status = note.archived ? 'archived' : 'active'
      const category = note.category

      acc[category] = acc[category] || {active: 0, archived: 0}
      acc[category][status]++
      return acc
    }, {})

    setSummaryData(categoriesCount)
  }

  const notesToShow = tableShowFor === 'unarchived' ? notArchivedNotes : archivedNotes

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
          notesToShow.map((note: any) => (
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
      {noteToEdit && (
        <EditNoteComponent
          note={noteToEdit}
          setEditedNoteId={() => setEditedNoteId(null)}
        />
      )}
    </section>
  )
}

export default TableComponent