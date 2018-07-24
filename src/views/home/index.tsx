import React from 'react';
import { Helmet } from 'react-helmet';
import NotesList from '../../components/NotesList';
import SearchComponent from 'components/Search';
import NoteModel from '../../models/Note';
import { actionFetchNotes, actionSearchNotes } from '../../actions';
import { connect } from 'react-redux';
import { NotesSearchOptions } from 'reducers/notesList';
import { AppState } from 'reducers';

const style = require('./style.scss');

interface HomeViewProps {
  loadData: () => () => void,
  searchNotes: (options: NotesSearchOptions) => void,
  notes: NoteModel[],
  state: string,
  errorMessage?: string
}

interface HomeViewState {
}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
  constructor(props: HomeViewProps, state: HomeViewState) {
    super(props, state);
    this.searchNotes = this.searchNotes.bind(this);
  }
  componentDidMount() {
    if (this.props.state === 'INIT') {
      this.props.loadData();
    }
  }

  searchNotes(text: string) {
    this.props.searchNotes({
      searchText: text
    });
  }

  render() {
    return (
      <section>
      <Helmet>
        <title>
          Notes
        </title>
      </Helmet>

      <SearchComponent onChange={this.searchNotes} />
      {this.renderNotes()}
    </section>
    );
  }

  renderNotes() {
    if (this.props.state === 'LOADING') {
      return (<p className={style.loading}>Loading ...</p>);
    } else if (this.props.state === 'ERROR') {
      return (<p className={style.error}>Error: {this.props.errorMessage}</p>);
    } else if (this.props.state === 'LOADED') {
      return (<NotesList notes={this.props.notes} />);
    } else {
      return '';
    }
  }
}

const mapStateToProps = (state: AppState, ownProps: HomeViewProps) => {
  return {
    notes: state.ui.list.notes.map((noteId) => state.entities.notes.byId[noteId]),
    state: state.ui.list.state,
    errorMessage: state.ui.list.errorMessage
  };
};

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
  return {
    loadData: () => dispatch(actionFetchNotes()),
    searchNotes: (options: NotesSearchOptions) => dispatch(actionSearchNotes(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);