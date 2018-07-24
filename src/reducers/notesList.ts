import {
  AppActions
} from '../actions';

import NoteModel from 'models/Note';
import { NotesDictState } from './notesDict';

export interface NotesSearchOptions {
  searchText: string
}

export interface NotesListState {
  state: string, // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  notes: number[],
  errorMessage?: string,
  searchOptions: NotesSearchOptions
}

export function defaultNotesListState() {
  return {
    state: 'INIT',
    notes: [],
    searchOptions: {
      searchText: ''
    }
  };
}

function filterByText(text: string): (n: NoteModel) => boolean  {
  return (note: NoteModel): boolean => {
    return note.title.toLowerCase().indexOf(text) > -1 ||
      note.content.toLowerCase().indexOf(text) > -1;
  };
}

export function notesListReducer(state: NotesListState, action: AppActions, notes: NotesDictState): NotesListState {
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
  if (action.type === 'NOTES_SEARCH') {
    return {
      ...state,
      notes: notes.allIds
        .map((id) => notes.byId[id])
        .filter(filterByText(action.options.searchText.toLowerCase()))
        .map((n) => n.id)
    };
  }
  return state;
}