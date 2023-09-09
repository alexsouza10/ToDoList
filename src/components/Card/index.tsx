import { Todo } from '../../App';
import './styles.css';

type CardProps = {
  todo: Todo;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function Card({ todo, completeTodo, deleteTodo }: CardProps) {
  const handleCompleteTodo = () => {
    completeTodo(todo.id)
  }

  const handleDeleteTodo = () => {
    deleteTodo(todo.id)
  }

  return (
    <div className={`card ${todo.completed ? 'done' : ''}`}>
      <h2>{todo.title}</h2>

      <div className="card-buttons">
        <button onClick={handleCompleteTodo}>
          {todo.completed ? 'Retomar' : 'Completar'}
        </button>
        <button onClick={handleDeleteTodo}>Delete</button>
      </div>
    </div>
  )
}