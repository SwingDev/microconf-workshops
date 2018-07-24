import React from 'react';
import NoteModel from 'models/Note';

const style = require('./style.scss');

export interface NoteProps {
  note: NoteModel
}

export interface NoteState {
}

export default class Note extends React.Component<NoteProps, NoteState> {

  contentWithBreaks() {
    const x = this.props.note.content.replace(/\n/g, '<br/>');
    return { __html: x };
  }

  render() {
    return (
      <div className={style.note}>
        <div className={style.noteTitle}>{this.props.note.title}</div>
        <p className={style.noteContent} dangerouslySetInnerHTML={this.contentWithBreaks()} />
        <div className={style.noteDate}>{this.props.note.creationDate}</div>
      </div>
    );
  }
}