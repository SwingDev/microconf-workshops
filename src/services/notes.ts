import NoteModel from '../models/Note';
import Poems from './data/notes';

const ENABLE_RANDOM_ERRORS = false;

export default class NotesService {
  static getAll(): Promise<NoteModel[]> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (ENABLE_RANDOM_ERRORS && Math.random() > 0.5) {
            reject(new Error('Error'));
          } else {
            resolve(Poems);
          }
        }, 1500);
      });
  }
}
