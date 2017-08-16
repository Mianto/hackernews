import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
{
title: 'React',
url: 'https://facebook.github.io/react/',
author: 'Jordan Walke',
num_comments: 3,
points: 4,
objectID: 0,
},
{
title: 'Redux',
url: 'https://github.com/reactjs/redux',
author: 'Dan Abramov, Andrew Clark',
num_comments: 2,
points: 5,
objectID: 1,
},
];

function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
/* ES6
const isSearched = (searchTerm) => (item) =>
!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:list,
      searchTerm:'',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({
      list: updatedList
    });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interaction">
          <Search
          value={searchTerm}
          onChange={this.onSearchChange}>
          Search
          </Search>
        </div>
        <Table
        list={list}
        searchTerm = {searchTerm}
        onDismiss = {this.onDismiss}
        />
      </div>
    );
  }
}

/*
class Search extends Component{
  render(){
    const {value, onChange, children} = this.props;
    return(
      <form>
        {children} <input
        type="text"
        value={value}
        onChange={onChange}
        />
      </form>
    );
  }
}
*/

const Search = ({value, onChange, children}) =>
  <div>
    <form>
      {children} <input
      type = "text"
      onChange = {onChange}
      value = {value}
      />
    </form>
  </div>

/*class Table extends Component{
  render(){
    const {list, searchTerm, onDismiss} = this.props;
    return(
      <div>
      { list.filter(isSearched(searchTerm)).map( item => {
          return (
          <div key = {item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
            <Button onClick={() => onDismiss(item.objectID)}>
            Dismiss
            </Button>
            </span>
          </div>
        );
      })}
      </div>
    );
  }
}*/

const Table = ({ list, searchTerm, onDismiss }) =>
  <div className="table">
    { list.filter(isSearched(searchTerm)).map(item =>
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
