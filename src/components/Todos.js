import React, {Component} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {
    render() {
        return this.props.todos.map((item) => (
            <TodoItem key={item.id} todo={item}
                      onMarkComplete={this.props.onMarkComplete}
                      deleteTodo={this.props.deleteTodo}
            />
        ));
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    onMarkComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default Todos;
