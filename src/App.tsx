import Card from './components/Card';
import './App.css';
import { ChangeEvent, useEffect, useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todo, setTodo] = useState<Todo[]>(() => {
    const storedTodo = localStorage.getItem('@codersList:todo');

    if (storedTodo) {
      return JSON.parse(storedTodo);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@codersList:todo', JSON.stringify(todo))
  }, [todo])

  const addTodo =() => {
    setTodo((previousTodo) =>
      [...previousTodo, { id: Math.random(), title: todoInput, completed: false }]
    );

    setTodoInput('');
  }

  const completeTodo =(id: number) => {
    setTodo((previousTodo) =>
      previousTodo.map((todo) => todo.id !== id ? todo : { ...todo, completed: !todo.completed })
    );
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  }

  const deleteTodo = (id: number) => {
    setTodo((previousTodo) => previousTodo.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input placeholder="Add a task" value={todoInput} onChange={handleInputChange} />
        <button onClick={addTodo}>To add</button>
      </div>

      {
        todo.map((todo) => (
          <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))
      }
    </div>
  )
}

export default App