import NoteModel from 'models/Note';
import { Action, Dispatch } from 'redux';
import NotesService from '../services/notes';

export const ACTION_NOTES_FETCH = 'NOTES_FETCH';
export const ACTION_NOTES_FETCH_SUCCESS = 'NOTES_FETCH_SUCCESS';
export const ACTION_NOTES_FETCH_ERROR = 'NOTES_FETCH_ERROR';
export const ACTION_NOTES_SEARCH = 'NOTES_SEARCH';

export function isAction<A extends Action>(action: Action, type: string): action is A {
  return action.type === type;
}

export interface IActionNotesFetch extends Action {
  type: 'NOTES_FETCH'
}

export interface IActionNotesFetchSuccess extends Action {
  type: 'NOTES_FETCH_SUCCESS',
  notes: NoteModel[]
}

export interface IActionNotesFetchError extends Action {
  type: 'NOTES_FETCH_ERROR',
  errorMessage: string
}

export interface IActionSearchNotes {
  type: 'NOTES_SEARCH',
  options: {
    searchText: string
  }
}

export type AppActions = IActionNotesFetch | IActionNotesFetchSuccess | IActionNotesFetchError | IActionSearchNotes;

function dispatchFetchNotesProgress(): IActionNotesFetch {
  return {
    type: ACTION_NOTES_FETCH
  };
}

function dispatchFetchNotesSuccess(notes: NoteModel[]): IActionNotesFetchSuccess {
  return {
    type: ACTION_NOTES_FETCH_SUCCESS,
    notes
  };
}

function dispatchFetchNotesError(e: Error): IActionNotesFetchError {
  return {
    type: ACTION_NOTES_FETCH_ERROR,
    errorMessage: e.message
  };
}

export function actionFetchNotes() {
  return (dispatch: Dispatch) => {
    dispatch(dispatchFetchNotesProgress());
    return NotesService.getAll()
    .then((notes) => {
      return dispatch(dispatchFetchNotesSuccess(notes));
    })
    .catch((e: Error) => {
      return dispatch(dispatchFetchNotesError(e));
    });
  };
}

interface SearchNotesOptions {
  searchText: string,
}

export function actionSearchNotes(options: SearchNotesOptions) {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ACTION_NOTES_SEARCH,
      options
    });
  };
}
