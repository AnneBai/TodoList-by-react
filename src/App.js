import React, { Component } from 'react';
import './App.css';


let id = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      addNew: false,
      newText: "",
    }
  }

  addItem = () => {
    this.setState({
      addNew: true,
    });
  };

  deleteItem = (id) => {
    const {items} = this.state;
    const newItems = items.filter(o => o.id !== id);
    this.setState({
      items: newItems,
    });
  };

  handleOk = () => {
    const {items, newText} = this.state;
    if (newText.trim() === "") {
      return this.setState({
        addNew: false,
        newText: "",
      });
    }
    const newItem = {
      id: ++id,
      text: newText,
      finished: false,
    };
    this.setState({
      items: items.concat(newItem),
      addNew: false,
      newText: "",
    });
  };

  handleChangeText = (e) => {
    this.setState({
      newText: e.target.value,
    });
  };

  handleChangeFinished = (id, finished) => {
    const {items} = this.state;
    const newItems = items.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          finished,
        };
      }
      return o;
    });
    this.setState({
      items: newItems,
    })
  };

  handleClear = () => {
    const isClear = window.confirm("Are you sure to clear all the items ?");
    if (isClear) {
      return this.setState({
        items: [],
      })
    }
    return false;
  };
  render() {
    const {items, addNew, newText} = this.state;
    return (
      <div className="App">
          <div className="App-header">
            Todo List
          </div>
          <ol>
            {items.map((o) => {
              return (
                <li className="todo-item" key={o.id}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={o.finished}
                    onClick={(e) => {
                      this.handleChangeFinished(o.id, e.target.checked);
                    }}
                  />
                  <div className={o.finished ? "text finished" : "text"}>{o.text}</div>
                  <button
                    className="btn delete"
                    onClick={() => {
                      this.deleteItem(o.id)
                    }}
                  >&times;</button>
                </li>
              );
            })}
          </ol>
          <div>
            <button className="btn add" onClick={this.addItem}>+</button>
            <button className="btn clear" onClick={this.handleClear}>clear</button>
          </div>
          {
            addNew && (
              <div>
                <input className="input" type="text" id="itemText" value={newText} onChange={this.handleChangeText}/>
                <button className="btn ok" onClick={this.handleOk}>&radic;</button>
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
