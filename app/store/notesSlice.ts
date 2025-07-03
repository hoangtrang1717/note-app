import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Category, CreateNotePayload, Note, NotesState} from '../types/notes';
import {storage} from './storage';

// Async thunks for data persistence
export const loadNotes = createAsyncThunk('notes/loadNotes', async () => {
  try {
    const notes = await storage.getString('notes');
    const categories = await storage.getString('categories');
    return {
      notes: notes ? JSON.parse(notes) : getDefaultNotes(),
      categories: categories ? JSON.parse(categories) : getDefaultCategories(),
    };
  } catch (error) {
    return {
      notes: getDefaultNotes(),
      categories: getDefaultCategories(),
    };
  }
});

const getDefaultCategories = (): Category[] => [
  {id: 'workAndStudy', name: 'Work and study'},
  {id: 'life', name: 'Life'},
  {id: 'healthAndWellness', name: 'Health and wellness'},
];

const getDefaultNotes = (): Note[] => [
  {
    category: 'workAndStudy',
    content:
      'Computer networking involves connecting multiple devices to share resources and communicate. Key concepts include IP addresses, protocols like TCP/IP, routers, switches, and network topologies. Understanding these fundamentals is essential for IT professionals.',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    category: 'workAndStudy',
    content:
      'JavaScript floating point arithmetic can be tricky due to IEEE 754 representation. Use parseFloat() for conversion, Number.toFixed() for precision control, and consider libraries like decimal.js for exact calculations. Example: (0.1 + 0.2).toFixed(1) = "0.3"',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    category: 'life',
    content:
      'Season chicken breast with salt, pepper, and herbs. Heat oil in pan, cook 6-7 minutes each side until golden. For salad: mix lettuce, tomatoes, cucumber, bell peppers. Dress with olive oil, lemon juice, salt. Serves 2. Cooking time: 20 minutes.',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    category: 'healthAndWellness',
    content:
      'Adults should drink 8-10 glasses (2-2.5 liters) of water daily. Benefits include better digestion, clearer skin, improved energy, and kidney health. Set reminders every 2 hours. Increase intake during exercise or hot weather. Track with apps or marked water bottles.',
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
];

const initialState: NotesState = {
  notes: getDefaultNotes(),
  categories: getDefaultCategories(),
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'createdAt',
  status: 'idle',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Essential note operations
    addNote: (state, action: PayloadAction<CreateNotePayload>) => {
      const newNote: Note = {
        category: action.payload.category,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      };
      state.notes.unshift(newNote);
    },

    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes.splice(action.payload, 1);
    },

    clearAllNotes: state => {
      state.notes = [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadNotes.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.status = 'complete';
        state.notes = action.payload.notes;
        state.categories = action.payload.categories;
      })
      .addCase(loadNotes.rejected, state => {
        state.status = 'error';
      });
  },
});

export const {addNote, deleteNote, clearAllNotes} = notesSlice.actions;

export default notesSlice.reducer;
