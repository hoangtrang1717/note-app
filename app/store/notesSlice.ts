import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CreateNotePayload, Note, NotesState, UpdateNotePayload } from '../types/notes';
import { storage } from './storage';

// Async thunks for data persistence
export const loadNotes = createAsyncThunk('notes/loadNotes', async () => {
  try {
    const notes = await storage.getString('notes');
    const categories = await storage.getString('categories');
    return {
      notes: notes ? JSON.parse(notes) : [],
      categories: categories ? JSON.parse(categories) : getDefaultCategories(),
    };
  } catch (error) {
    return {
      notes: [],
      categories: getDefaultCategories(),
    };
  }
});

export const saveNotes = createAsyncThunk(
  'notes/saveNotes',
  async ({ notes, categories }: { notes: Note[]; categories: Category[] }) => {
    await storage.set('notes', JSON.stringify(notes));
    await storage.set('categories', JSON.stringify(categories));
    return { notes, categories };
  }
);

const getDefaultCategories = (): Category[] => [
  { id: 'work-and-study', name: 'Work and study', color: '#9C27B0', icon: 'library' },
  { id: 'life', name: 'Life', color: '#4CAF50', icon: 'home' },
  { id: 'health-and-wellness', name: 'Health and wellness', color: '#FF5722', icon: 'heart' },
];

const getDefaultNotes = (): Note[] => [
  {
    id: '1',
    title: 'Overview of basic computer networking knowledge',
    content: 'Computer networking involves connecting multiple devices to share resources and communicate. Key concepts include IP addresses, protocols like TCP/IP, routers, switches, and network topologies. Understanding these fundamentals is essential for IT professionals.',
    category: 'work-and-study',
    tags: ['networking', 'computer-science', 'study'],
    color: '#9C27B0',
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '2',
    title: 'How to calculate float multiplication and division in JavaScript?',
    content: 'JavaScript floating point arithmetic can be tricky due to IEEE 754 representation. Use parseFloat() for conversion, Number.toFixed() for precision control, and consider libraries like decimal.js for exact calculations. Example: (0.1 + 0.2).toFixed(1) = "0.3"',
    category: 'work-and-study',
    tags: ['javascript', 'programming', 'math'],
    color: '#9C27B0',
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Pan-fried chicken breast with vegetable salad',
    content: 'Season chicken breast with salt, pepper, and herbs. Heat oil in pan, cook 6-7 minutes each side until golden. For salad: mix lettuce, tomatoes, cucumber, bell peppers. Dress with olive oil, lemon juice, salt. Serves 2. Cooking time: 20 minutes.',
    category: 'life',
    tags: ['recipe', 'cooking', 'healthy'],
    color: '#4CAF50',
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '4',
    title: 'Maintain sufficient daily water intake',
    content: 'Adults should drink 8-10 glasses (2-2.5 liters) of water daily. Benefits include better digestion, clearer skin, improved energy, and kidney health. Set reminders every 2 hours. Increase intake during exercise or hot weather. Track with apps or marked water bottles.',
    category: 'health-and-wellness',
    tags: ['health', 'hydration', 'wellness'],
    color: '#FF5722',
    isPinned: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

const initialState: NotesState = {
  notes: getDefaultNotes(),
  categories: getDefaultCategories(),
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'updatedAt',
  viewMode: 'grid',
  status: 'idle',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // Note CRUD operations
    addNote: (state, action: PayloadAction<CreateNotePayload>) => {
      const newNote: Note = {
        id: Date.now().toString(),
        title: action.payload.title,
        content: action.payload.content,
        category: action.payload.category,
        tags: action.payload.tags || [],
        color: action.payload.color || '#607D8B',
        isPinned: false,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.notes.unshift(newNote);
    },

    updateNote: (state, action: PayloadAction<UpdateNotePayload>) => {
      const noteIndex = state.notes.findIndex(note => note.id === action.payload.id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },

    duplicateNote: (state, action: PayloadAction<string>) => {
      const originalNote = state.notes.find(note => note.id === action.payload);
      if (originalNote) {
        const duplicatedNote: Note = {
          ...originalNote,
          id: Date.now().toString(),
          title: `${originalNote.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.notes.unshift(duplicatedNote);
      }
    },

    togglePinNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(noteItem => noteItem.id === action.payload);
      if (note) {
        note.isPinned = !note.isPinned;
        note.updatedAt = new Date().toISOString();
      }
    },

    toggleArchiveNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find(noteItem => noteItem.id === action.payload);
      if (note) {
        note.isArchived = !note.isArchived;
        note.updatedAt = new Date().toISOString();
      }
    },

    // Category operations
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      const newCategory: Category = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.categories.push(newCategory);
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      const categoryIndex = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = action.payload;
      }
    },

    deleteCategory: (state, action: PayloadAction<string>) => {
      // Move notes from deleted category to 'general'
      state.notes.forEach(note => {
        if (note.category === action.payload) {
          note.category = 'general';
        }
      });
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },

    // UI state operations
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setSortBy: (state, action: PayloadAction<'updatedAt' | 'createdAt' | 'title'>) => {
      state.sortBy = action.payload;
    },

    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },

    clearSearch: (state) => {
      state.searchQuery = '';
      state.selectedCategory = null;
    },

    // Bulk operations
    deleteSelectedNotes: (state, action: PayloadAction<string[]>) => {
      state.notes = state.notes.filter(note => !action.payload.includes(note.id));
    },

    archiveSelectedNotes: (state, action: PayloadAction<string[]>) => {
      state.notes.forEach(note => {
        if (action.payload.includes(note.id)) {
          note.isArchived = true;
          note.updatedAt = new Date().toISOString();
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadNotes.fulfilled, (state, action) => {
        state.status = 'complete';
        state.notes = action.payload.notes;
        state.categories = action.payload.categories;
      })
      .addCase(loadNotes.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(saveNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveNotes.fulfilled, (state) => {
        state.status = 'complete';
      })
      .addCase(saveNotes.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  duplicateNote,
  togglePinNote,
  toggleArchiveNote,
  addCategory,
  updateCategory,
  deleteCategory,
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  setViewMode,
  clearSearch,
  deleteSelectedNotes,
  archiveSelectedNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
