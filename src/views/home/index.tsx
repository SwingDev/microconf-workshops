import React from 'react';
import { Helmet } from 'react-helmet';
import NotesList from '../../components/NotesList';
import NoteModel from '../../models/Note';
import { actionFetchNotes } from '../../actions';
import { connect } from 'react-redux';
import { AppState } from 'reducers';

const style = require('./style.scss');

interface HomeViewProps {
  loadData: () => () => void,
  notes: NoteModel[],
  state: string,
  errorMessage?: string
}

interface HomeViewState {
}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
  constructor(props: HomeViewProps, state: HomeViewState) {
    super(props, state);
  }
  componentDidMount() {
    if (this.props.state === 'INIT') {
      this.props.loadData();
    }
  }

  render() {
    return (
      <section>
      <Helmet>
        <title>
          Notes
        </title>
      </Helmet>

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
      return 'Init State';
    }
  }
}

const mapStateToProps = (state: AppState, ownProps: HomeViewProps) => {
  // TODO: Use state to fill the props of the component
  return {
    notes: [],
    state: 'INIT',
    errorMessage: ''
  };
};

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
  return {
    loadData: () => dispatch(actionFetchNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);