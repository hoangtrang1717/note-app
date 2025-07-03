import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {addNote, clearAllNotes, loadNotes} from '../store/notesSlice';
import {CreateNotePayload, Note} from '../types/notes';
import {UI_CONSTANTS} from '../constants';

export const useNotes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {notes, categories, status} = useSelector(
    (state: RootState) => state.notes,
  );

  // Memoized grouped notes by category
  const groupedNotes = useMemo(() => {
    const grouped = notes.reduce((acc, note) => {
      if (!acc[note.category]) {
        acc[note.category] = [];
      }
      acc[note.category].push(note);
      return acc;
    }, {} as Record<string, Note[]>);

    // Sort notes by creation date (most recent first) and limit per category
    Object.keys(grouped).forEach(category => {
      grouped[category] = grouped[category]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, UI_CONSTANTS.MAX_RECENT_NOTES_PER_CATEGORY);
    });

    return grouped;
  }, [notes]);

  // Memoized category counts
  const categoryCounts = useMemo(() => {
    return notes.reduce((acc, note) => {
      acc[note.category] = (acc[note.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [notes]);

  // Note operations
  const createNote = useCallback(
    (noteData: CreateNotePayload) => {
      dispatch(addNote(noteData));
    },
    [dispatch],
  );

  const clearAll = useCallback(() => {
    dispatch(clearAllNotes());
  }, [dispatch]);

  const loadNotesData = useCallback(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  // Computed states
  const isLoading = status === 'loading';
  const hasNotes = notes.length > 0;
  const hasError = status === 'error';

  return {
    // Data
    notes,
    categories,
    groupedNotes,
    categoryCounts,

    // States
    isLoading,
    hasNotes,
    hasError,
    status,

    // Operations
    createNote,
    clearAll,
    loadNotesData,
  };
};
