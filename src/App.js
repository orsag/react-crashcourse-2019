import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import axios from 'axios';
// import uuid from 'uuid';

import './App.css';

class App extends Component {
    state = {
        todos: []
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                this.setState({
                    todos: res.data.slice(0, 10)
                })
            });
    }

    onMarkComplete = (id) => {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        })
    };

    deleteTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => {
                this.setState({
                    todos: [...this.state.todos].filter(todo => {
                        return todo.id !== id
                    })
                });
            });
    };

    addTodo = (title) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        }).then(res => {
            this.setState({
                todos: [...this.state.todos, res.data]
            });
        })
            .catch(err => console.log(err));
    };

    render() {
        // console.log(this.state.todos);
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header/>
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo}/>
                                <Todos todos={this.state.todos}
                                       onMarkComplete={this.onMarkComplete}
                                       deleteTodo={this.deleteTodo}
                                />
                            </React.Fragment>
                        )}/>
                        <Route path="/about" component={About}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
