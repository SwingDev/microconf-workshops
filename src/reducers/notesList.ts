import {
  AppActions
} from '../actions';

import NoteModel from 'models/Note';

export interface NotesListState {
  state: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  notes: NoteModel[],
  errorMessage?: string
}

export function defaultNotesListState() {
  return {
    state: 'INIT',
    notes: []
  };
}

export function notesListReducer(state: NotesListState, action: AppActions): NotesListState {
  // TODO: Write reducers here.
  return state;
}