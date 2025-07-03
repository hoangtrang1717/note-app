export interface Note {
  category: string;
  content: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface NotesState {
  notes: Note[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: 'createdAt';
  status: 'idle' | 'loading' | 'complete' | 'error';
}

export interface CreateNotePayload {
  content: string;
  category: string;
}

export interface UpdateNotePayload {
  category?: string;
  content?: string;
}
