import {ChangeEvent, FC, FormEvent, useState} from 'react'
import {createNote} from "../../store/notesSlice"
import {v4 as uuidv4} from 'uuid'
import {createDate, getDatesFromString} from "../../utils/helperFunctions"
import {useAppDispatch} from "../../hooks"

type ValueType = {
  title: string
  category: string
  content: string
}
const CreateNoteForm: FC<{ setIsCreateFromOpen: (open: boolean) => void }> = ({setIsCreateFromOpen}) => {

  const dispatch = useAppDispatch()
  const [value, setValue] =
    useState<ValueType>({
      title: '',
      category: 'Task',
      content: '',
    })

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    setValue((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }))
  }

  const createNoteHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNote = {
      id: uuidv4(),
      title: value.title,
      category: value.category,
      content: value.content,
      created: createDate(),
      dates: getDatesFromString(value.content),
      archived: false,
    }

    dispatch(createNote(newNote))

    setValue({
      title: '',
      category: 'Task',
      content: '',
    })

    setIsCreateFromOpen(false)
  }

  return (
    <section className="m-5">
      <form onSubmit={createNoteHandler}>
        <label htmlFor="title">Name</label>
        <input
          className=" h-9 mx-1.5 border-2 border-my-grey"
          value={value.title}
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
          required/>
        <label htmlFor="category">Category</label>
        <select
          className="h-9 mx-1.5 border-2 border-my-grey"
          value={value.category}
          onChange={handleChange}
          name="category"
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
          <option value="Quote">Quote</option>
        </select>
        <label htmlFor="content">Notes</label>
        <input
          className="h-9 mx-1.5 border-2 border-my-grey"
          value={value.content}
          onChange={handleChange}
          type="text"
          id="content"
          name="content"
          required/>
        <button
          className="h-9 cursor-pointer rounded-sm p-1 border-2 border-my-grey"
          type="submit">Add Note</button>
      </form>
    </section>
  )
}

export default CreateNoteForm