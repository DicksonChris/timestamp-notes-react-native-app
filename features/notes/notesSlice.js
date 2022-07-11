import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

const initialState = { isLoading: true, errMess: null, notesArray: [] }

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      console.log('reducer addNote state>>>', state)
      const newNote = {
        id: state.notesArray.length + 1, // suspicious
        ...action.payload,
      }
      state.notesArray.push(newNote)
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
  },
})

export const notesReducer = notesSlice.reducer

export const { addNote } = notesSlice.actions
