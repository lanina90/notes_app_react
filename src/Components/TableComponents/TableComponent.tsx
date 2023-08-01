import React, {FC, ReactNode, useEffect, useState} from 'react'
import {getCategoryImage} from "../../utils/helperFunctions"
import {NoteType} from "../../store/notesSlice"
import EditNoteComponent from "../Forms/EditNoteComponent"
import TableRowArchive from "./TableRowArchive"
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
  const Overlay = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
  )

  const notesToShow = tableShowFor === 'unarchived' ? notArchivedNotes : archivedNotes

  return (
    <section>
      <table className="w-full mx-auto mb-5" >
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
            <TableRowArchive
              note={note}
              tableShowFor={tableShowFor}
              setEditedNoteId={setEditedNoteId}/>
          )) : null}

        {tableShowFor === 'summary' &&
          (
            Object.keys(summaryData).map((category) => (
              <tr key={category}>
                <td>
                  <div className="row-data rounded-l-lg">
                  <div className="flex-container">
                    <div className="category-image">
                      <img
                        style={{width: '20px'}}
                        src={getCategoryImage(category)} alt={category}/>
                    </div>
                    <div>{category}</div>
                  </div>
                  </div>
                </td>
                <td><div className="row-data ">{summaryData[category].active}</div></td>
                <td><div className="row-data rounded-r-lg ">{summaryData[category].archived}</div></td>
              </tr>
            ))
          )
        }
        </tbody>
      </table>
      {noteToEdit && <Overlay />}
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