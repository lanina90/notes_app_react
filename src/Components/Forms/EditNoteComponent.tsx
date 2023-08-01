import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import {getDatesFromString} from "../../utils/helperFunctions"
import {editNote, NoteType} from "../../store/notesSlice"
import {useAppDispatch} from "../../hooks"

type EditNoteComponentPropsType = {
  note: NoteType
  setEditedNoteId: (() => void)
}
const EditNoteComponent: FC<EditNoteComponentPropsType> = ({setEditedNoteId, note}) => {

  const dispatch = useAppDispatch()
  const [value, setValue] = useState({
    title: '',
    category: 'Task',
    content: '',
  })

  useEffect(() => {
    setValue({
      title: note.title,
      category: note.category,
      content: note.content,
    })
  }, [note.title, note.category, note.content,])

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    setValue((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }))
  }

  const editNoteHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(editNote({
      id: note.id,
      title: value.title,
      category: value.category,
      content: value.content,
      dates: getDatesFromString(value.content),
    }))

    setValue({
      title: '',
      category: 'Task',
      content: '',
    })

    setEditedNoteId()
    document.body.className = ''
  }

  return (
    <section className="absolute top-20 left-1/4 w-1/2 h-72 bg-white z-20 rounded-2xl">
      <form className="flex flex-col p-5" onSubmit={editNoteHandler}>
        <label htmlFor="title">Title</label>
        <input
          className="m-2 h-9 border-2 border-my-grey"
          value={value.title}
          onChange={handleChange}
          type="text"
          name="title"
        />
        <label htmlFor="content">Content</label>
        <input
          className="m-2 h-9 border-2 border-my-grey"
          value={value.content}
               onChange={handleChange}
               type="text"
               name="content"/>
        <label htmlFor="category">Category</label>
        <select
          className="m-2 h-9 border-2 border-my-grey"
          value={value.category}
          onChange={handleChange}
          name="category"
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
          <option value="Quote">Quote</option>
        </select>
        <button
          className="w-3/6 m-auto p-2.5h-9 cursor-pointer p-1 border-2 border-my-grey"
          type="submit">Save</button>
      </form>
    </section>
  )
}

export default EditNoteComponent