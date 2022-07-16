import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import { baseUrl } from '../../shared/baseUrl'

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetch(baseUrl + 'notes')
  if (!response.ok) {
    return Promise.reject('Unable to fetch, status: ' + response.status)
  }
  return response.json()
})

export const postNote = createAsyncThunk('notes/postNote', async (note, { dispatch }) => {
  // Add note to database
  const response = await fetch(baseUrl + 'notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    return Promise.reject('Unable to post, status: ' + response.status)
  }
  const data = await response.json()
  dispatch(addNote(data))
})

// update existing note in database
// TODO: Not actually called by anything yet
export const putNote = createAsyncThunk('notes/updateNote', async (note, { dispatch }) => {
  const response = await fetch(baseUrl + 'notes/' + note.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    return Promise.reject('Unable to update, status: ' + response.status)
  }
  const data = await response.json()
  dispatch(updateNote(data))
})

// delete note from database
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId, { dispatch }) => {
  const response = await fetch(baseUrl + 'notes/' + noteId, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return Promise.reject('Unable to delete, status: ' + response.status)
  }
  dispatch(removeNote(noteId))
})

const initialState = { isLoading: true, errMess: null, notesArray: [] }

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const setNewNoteID = () =>
        state.notesArray.reduce((acc, note) => (acc = acc > note.id ? acc : note.id), 0) + 1
      const newNote = {
        id: setNewNoteID(), // TODO: Handle id in db instead
        ...action.payload,
      }
      state.notesArray.push(newNote)
    },
    updateNote: (state, action) => {
      const updatedNote = { ...action.payload }
      const index = state.notesArray.findIndex((note) => note.id === updatedNote.id)
      state.notesArray[index] = updatedNote
    },
    removeNote: (state, action) => {
      const index = state.notesArray.findIndex((note) => note.id === action.payload)
      state.notesArray.splice(index, 1)
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state) => {
      state.isLoading = true
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.isLoading = false
      state.errMess = null
      state.notesArray = action.payload
    },
    [fetchNotes.rejected]: (state, action) => {
      state.isLoading = false
      state.errMess = action.error ? action.error.message : 'Fetch failed'
    },
    [postNote.rejected]: (state, action) => {
      alert(
        'Your note could not be posted\nError: ' +
          (action.error ? action.error.message : 'Fetch failed')
      )
    },
    [postNote.fulfilled]: (state, action) => {
      state.notesArray.push(action.payload)
    },
    [putNote.rejected]: (state, action) => {
      alert(
        'Your note could not be updated\nError: ' +
          (action.error ? action.error.message : 'Fetch failed')
      )
    },
    [putNote.fulfilled]: (state, action) => {
      const updatedNote = { ...action.payload }
      const index = state.notesArray.findIndex((note) => note.id === updatedNote.id)
      state.notesArray[index] = updatedNote
    },
    [deleteNote.rejected]: (state, action) => {
      alert(
        'Your note could not be deleted\nError: ' +
          (action.error ? action.error.message : 'Fetch failed')
      )
    },
    [deleteNote.fulfilled]: (state, action) => {
      const index = state.notesArray.findIndex((note) => note.id === action.payload)
      state.notesArray.splice(index, 1)
    },
  },
})

// Selectors
export const selectNotes = (state) => state.notes.notesArray

const dateTimeOptions = {
  year: 'yyyy',
  month: 'M',
  date: 'd',
  day: 'EEE',
  time: 'h:mm:ss a',
}
// Select memoized notes add computed properties
const addTimeAndDateProperties = (notesArr, dateTimeOptions) => {
  return notesArr.map((note) => {
    const modifiedNote = { ...note }
    const timestamp = new Date(modifiedNote.createdAt)
    modifiedNote.year = format(timestamp, dateTimeOptions.year)
    modifiedNote.month = format(timestamp, dateTimeOptions.month)
    modifiedNote.date = format(timestamp, dateTimeOptions.date)
    modifiedNote.day = format(timestamp, dateTimeOptions.day)
    modifiedNote.time = format(timestamp, dateTimeOptions.time) // TODO: Add options for time format and always show seconds vs only show seconds when two notes are created within the same minute
    return modifiedNote
  })
}

export const selectComputedNotes = createSelector([selectNotes], (notes) => {
  const modifiedNotes = addTimeAndDateProperties(notes, dateTimeOptions)
  const reduceArr = (arr, keyString) =>
    arr.reduce((acc, curr) => {
      const key = curr[keyString]
      if (!acc[key]) {
        acc[key] = [curr]
      } else {
        acc[key].push(curr)
      }
      return acc
    }, {})
  const outerYearsArr = reduceArr(modifiedNotes, 'year')

  for (const [key, arr] of Object.entries(outerYearsArr)) {
    const monthsArr = reduceArr(arr, 'month')

    for (const [key, arr] of Object.entries(monthsArr)) {
      const datesArr = reduceArr(arr, 'date')
      monthsArr[key] = datesArr
    }
    outerYearsArr[key] = monthsArr
  }
  return modifiedNotes
})

export const notesReducer = notesSlice.reducer

export const { addNote, removeNote, updateNote } = notesSlice.actions
