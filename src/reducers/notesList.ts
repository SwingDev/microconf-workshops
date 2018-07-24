import {
  AppActions
} from '../actions';

import NoteModel from 'models/Note';

export interface NotesListState {
  state: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  notes: number[],
  errorMessage?: string
}

export function defaultNotesListState() {
  return {
    state: 'INIT',
    notes: []
  };
}

export function notesListReducer(state: NotesListState, action: AppActions): NotesListState {
  if (action.type === 'NOTES_FETCH') {
    return {
      ...state,
      state: 'LOADING',
      notes: [],
    };
  }
  if (action.type === 'NOTES_FETCH_SUCCESS') {
    return {
      ...state,
      state: 'LOADED',
      notes: [...action.notes.map((n: NoteModel) => n.id)],
    };
  }
  if (action.type === 'NOTES_FETCH_ERROR') {
    return {
      ...state,
      state: 'ERROR',
      notes: [],
      errorMessage: action.errorMessage
    };
  }
  return state;
}