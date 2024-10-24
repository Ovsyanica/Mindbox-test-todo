import { StatusTypes, Todo, TodoStatusType } from "../../types/types"
import styles from './TodoItem.module.css'

interface TodoItemProps {
	todo: Todo;
	setStatus: (newStatus: TodoStatusType, todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setStatus }) => {

	function changeStatus() {
		if (todo.status === StatusTypes.COMPLETED) setStatus(StatusTypes.ACTIVE, todo)
		else setStatus(StatusTypes.COMPLETED, todo)
	}

	return (
		<div className={styles.content} data-testid='todo-item'>
			<input
				data-testid='todo-checkbox'
				className={styles.checkbox}
				id={`checkbox-${todo.id}`}
				type="checkbox"
				checked={todo.status === StatusTypes.COMPLETED ? true : false}
				onChange={() => changeStatus()}
			/>
			<label htmlFor={`checkbox-${todo.id}`}>
				<span className={styles.description} >{todo.description}</span>
			</label>
		</div>
	)
}

export default TodoItem