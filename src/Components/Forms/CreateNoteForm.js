import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {createNote} from "../../store/notesSlice";
import { v4 as uuidv4 } from 'uuid';
import {createDate, getDatesFromString} from "../../utils/helperFunctions";

const CreateNoteForm = ({setIsCreateFromOpen}) => {

  const dispatch = useDispatch()
  const [value, setValue] = useState({
    title: '',
    category: 'Task',
    content: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }));
  };

  const createNoteHandler = (event) => {
    event.preventDefault()
    const newNote = {
      id: uuidv4(),
      title: value.title,
      category: value.category,
      content: value.content,
      created: createDate(),
      dates: getDatesFromString(value.content),
      archived: false,
    };

    dispatch(createNote(newNote));

    setValue({
      title: '',
      category: 'Task',
      content: '',
    });

    setIsCreateFromOpen(false)

  };

  return (
    <section>
      <form onSubmit={createNoteHandler}>
        <label htmlFor="title">Name</label>
        <input
          value={value.title}
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
          required/>
        <label htmlFor="category">Category</label>
        <select
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
          value={value.content}
          onChange={handleChange}
          type="text"
          id="content"
          name="content"
          required/>
        <button type="submit">Add Note</button>
      </form>
    </section>
  );
};

export default CreateNoteForm;