import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';



/* ES6
const isSearched = (searchTerm) => (item) =>
!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchTerm:DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
    result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopstories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event){
    const { searchTerm }= this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    });
  }

  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interaction">
          <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}>
          Search
          </Search>
          <Button onClick={() => this.fetchSearchTopstories(searchTerm, page + 1)}>
          More
          </Button>
        </div>
        {result ?
        <Table
        list={result.hits}
        onDismiss = {this.onDismiss}
        />
        :null}
      </div>
    );
  }
}

const Search = ({value, onChange, onSubmit, children}) =>
  <div>
    <form onSubmit={onSubmit}>
      {children} <input
      type = "text"
      onChange = {onChange}
      value = {value}
      />
      <button type="submit">
        {children}
      </button>
    </form>
  </div>


const Table = ({ list, onDismiss }) =>
  <div className="table">
    { list.map(item =>
    <div key={item.objectID} className="table-row">
      <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>
      {item.author}
      </span>
      <span style={{ width: '10%' }}>
      {item.num_comments}
      </span>
      <span style={{ width: '10%' }}>
      {item.points}
      </span>
      <span style={{ width: '10%' }}>
      <Button
      onClick={() => onDismiss(item.objectID)}
      className="button-inline"
      >
      Dismiss
      </Button>
      </span>
    </div>
    )}
  </div>


class Button extends Component{
  render(){
    const {
      onClick,
      className = "",
      children} = this.props;
    return(
      <button
        onClick = {onClick}
        className = {className}
        type="button"
      >
      {children}
      </button>
    );
  }
}


export default App;
