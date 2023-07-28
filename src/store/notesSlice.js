import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      title: 'Shopping list',
      created: 'June 21, 2023',
      content: 'Bread, cucumbers, salt',
      category: 'Task',
      dates: '',
      archived: true,
    },
    {
      id: 2,
      title: 'The theory of evolution',
      created: 'June 29, 2023',
      content: 'The evolution theory',
      category: 'Random Thought',
      dates: '',
      archived: false,
    },
    {
      id: 3,
      title: 'New feature',
      created: 'July 15, 2023',
      content: 'Implement new feature for app before 18/07/2023',
      category: 'Idea',
      dates: '',
      archived: false,
    },
    {
      id: 4,
      title: 'Workout routine',
      created: 'July 20, 2023',
      content: '1. Pushups 2. Situps 3. Squats',
      category: 'Task',
      dates: '20/07/2023, 24/07/2023',
      archived: false,
    },
    {
      id: 5,
      title: 'Inspirational Quote',
      created: '2023-07-27',
      content: 'The most important step is always the next one.',
      category: 'Quote',
      dates: '',
      archived: false,
    },
    {
      id: 6,
      title: 'Grocery shopping',
      created: 'July 23, 2023',
      content: 'Milk, Eggs, Bread, Fruits',
      category: 'Task',
      dates: '29/07/2023',
      archived: false,
    },
    {
      id: 7,
      title: 'Car service',
      created: 'July 25, 2023',
      content: 'Need to service the car',
      category: 'Task',
      dates: '1/08/2023',
      archived: false,
    }
  ],
}
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action) => {
      const { id, title, category, content, dates } = action.payload;
      const noteToEdit = state.notes.find((note) => note.id === id);
      if (noteToEdit) {
        noteToEdit.title = title;
        noteToEdit.category = category;
        noteToEdit.content = content;
        noteToEdit.dates = dates;
      }
    },
    archivedNote: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.map(note => {
        if (note.id === id) {
          return { ...note, archived: true };
        }
        return note;
      });
    },
    unArchivedNote: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.map(note => {
        if (note.id === id) {
          return { ...note, archived: false };
        }
        return note;
      });
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter( (note) => note.id !== action.payload)
    }
  }
})

export const {
  createNote,
  removeNote,
  archivedNote,
  unArchivedNote,
  editNote
} = notesSlice.actions;

export const selectArchivedNotes = state => state.notes.notes.filter(note => note.archived);
export const selectNotArchivedNotes = state => state.notes.notes.filter(note => !note.archived);

export default notesSlice.reducer;