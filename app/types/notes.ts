export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  color: string;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  reminder?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface NotesState {
  notes: Note[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: 'updatedAt' | 'createdAt' | 'title';
  viewMode: 'grid' | 'list';
  status: 'idle' | 'loading' | 'complete' | 'error';
}

export interface CreateNotePayload {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  color?: string;
}

export interface UpdateNotePayload {
  id: string;
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  color?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  reminder?: string;
}
