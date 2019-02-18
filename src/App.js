import React, { Component } from 'react';
import './App.css';
import Checkbox from './components/Checkbox/Checkbox';
import Button from './components/Button/Button';
import Input from './components/Input/Input';


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
    const {items} = this.state;
    if (items.length === 0) {
      return false;
    }
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
                  <Checkbox
                    checked={o.finished}
                    onClick={(e) => {
                      this.handleChangeFinished(o.id, !o.finished);
                    }}
                  />
                  <div className={o.finished ? "text finished" : "text"}>{o.text}</div>
                  <Button
                    type="warn"
                    onClick={() => {
                      this.deleteItem(o.id)
                    }}
                  >&times;</Button>
                </li>
              );
            })}
          </ol>
          <div>
            <Button type="normal" onClick={this.addItem}>+</Button>
            <Button type="error" onClick={this.handleClear}>clear</Button>
          </div>
          {
            addNew && (
              <div>
                <Input value={newText} onChange={this.handleChangeText} handleConfirm={this.handleOk}/>
                <Button type="info" onClick={this.handleOk}>&radic;</Button>
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
