import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export type NoteType = {
  id: any
  title: string
  category: string
  content: string
  created: string
  dates: string
  archived: boolean
}

export type NoteEditType = {
  id: any
  title: string
  category: string
  content: string
  dates: string
}

type NotesStateType = {
  notes: NoteType[]
}

const initialState: NotesStateType = {
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
  ]
}


const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.push(action.payload)
    },
    editNote: (state, action: PayloadAction<NoteEditType>) => {
      const {id, title, category, content, dates} = action.payload
      const noteToEdit = state.notes.find((note) => note.id === id)
      if (noteToEdit) {
        noteToEdit.title = title
        noteToEdit.category = category
        noteToEdit.content = content
        noteToEdit.dates = dates
      }
    },
    toggleArchive: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const toggledNote = state.notes.find(note => note.id === id)
      if (toggledNote) {
        toggledNote.archived = !toggledNote.archived
      }
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    }
  }
})

export const {
  createNote,
  removeNote,
  editNote,
  toggleArchive
} = notesSlice.actions


export default notesSlice.reducer