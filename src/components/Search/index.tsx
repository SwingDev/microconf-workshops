import React from 'react';
const style = require('./style.scss');

export interface SearchComponentProps {
  onChange: (text: string) => void
}

export interface SearchComponentState {
  searchText: string
}
export default class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
  constructor(props: SearchComponentProps, context: {}) {
    super(props, context);
    this.state = {
      searchText: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      searchText: e.currentTarget.value
    });
    this.props.onChange(e.currentTarget.value);
  }

  render() {
    return (
        <div className={style.searchContainer}>
          <input className={style.searchInput} type='text' onChange={this.onChange} value={this.state.searchText} />
        </div>
    );
  }
}