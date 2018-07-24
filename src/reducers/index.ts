
import { notesListReducer, NotesListState, defaultNotesListState } from './notesList';
import { Action } from 'redux';

export interface AppState {
    list: NotesListState
}

export function defaultState() {
  return {
    list: defaultNotesListState()
  };
}

export function mainReducer(state: AppState = defaultState(), action: Action) {
  return {
    list: notesListReducer(state.list, action)
  };
}