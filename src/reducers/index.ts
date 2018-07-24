
import { notesListReducer, NotesListState, defaultNotesListState } from './notesList';
import { notesDictReducer, NotesDictState, defaultNotesDictState } from './notesDict';
import { Action } from 'redux';

export interface AppState {
  entities: {
    notes: NotesDictState,
  },
  ui: {
    list: NotesListState
  }
}

export function defaultState() {
  return {
    entities: {
      notes: defaultNotesDictState(),
    },
    ui: {
      list: defaultNotesListState()
    }
  };
}

export function mainReducer(state: AppState = defaultState(), action: Action) {
  return {
    entities: {
      notes: notesDictReducer(state.entities.notes, action),
    },
    ui: {
      list: notesListReducer(state.ui.list, action, state.entities.notes)
    }
  };
}