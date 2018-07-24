import NoteModel from 'models/Note';
import { AppActions } from '../actions';

export type NotesDict = {
  [Key: number]: NoteModel
};

export type NotesDictState = {
  byId: NotesDict,
  allIds: number[]
};

export function defaultNotesDictState(): NotesDictState {
  return {
    byId: {},
    allIds: []
  };
}

export function notesDictReducer(state: NotesDictState, action: AppActions): NotesDictState {
  if (action.type === 'NOTES_FETCH_SUCCESS') {
    return {
      byId: action.notes.reduce((acc, note) => ({ ...acc, [note.id]: note}), state),
      allIds: action.notes.map((n) => n.id)
    };
  }
  return state;
}