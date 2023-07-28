import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getDatesFromString} from "../../utils/helperFunctions";
import {editNote} from "../../store/notesSlice";

const EditNoteComponent = ({setEditedNoteId, note}) => {
  console.log(note);
  const dispatch = useDispatch()
  const [value, setValue] = useState({
    title: '',
    category: 'Task',
    content: '',
  });

  useEffect(() => {
    setValue({
      title: note.title,
      category: note.category,
      content: note.content,
    });
  }, [note.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }));
  };

  const editNoteHandler = (event) => {
    event.preventDefault()

    dispatch(editNote({
      id: note.id,
      title: value.title,
      category: value.category,
      content: value.content,
      dates: getDatesFromString(value.content),
    }));

    setValue({
      title: '',
      category: 'Task',
      content: '',
    });

    setEditedNoteId()

  };


  return (
    <section className="edit-module">
      <form className="edit-form" onSubmit={editNoteHandler}>
        <label htmlFor="title">Title</label>
        <input
          value={value.title}
          onChange={handleChange}
          type="text"
          name="title"
        />
        <label htmlFor="content">Content</label>
        <input value={value.content}
               onChange={handleChange}
               type="text"
               name="content"/>
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
        <button type="submit">Save</button>
      </form>
    </section>
  );
};

export default EditNoteComponent;