import { useMemo, useState } from "react"
import { FilterByStatusType, StatusTypes, Todo, TodoStatusType } from "../../types/types"
import OptionsBar from "../OptionsBar/OptionsBar"
import TodoItem from "../TodoItem/TodoItem";
import styles from './TodosList.module.css'


interface TodosListProps {
	todos: Todo[];
	clearCompleted: () => void;
	setStatus: (newStatus: TodoStatusType, todo: Todo) => void;
}

const TodosList: React.FC<TodosListProps> = ({ todos, clearCompleted, setStatus }) => {
	const [category, setCategory] = useState<FilterByStatusType>(StatusTypes.ALL)

	const todosLeft: number = useMemo(() => {
		let accumulator = 0

		todos.forEach(todo => {
			if (todo.status === StatusTypes.ACTIVE) accumulator += 1
		})

		return accumulator
	}, [todos])

	const filteredTodos: Todo[] = useMemo(() => {
		return todos.filter(todo => todo.status === category || category === StatusTypes.ALL)
	}, [category, todos])

	return (
		<div className={styles.wrapper}>
			<div style={{ overflow: 'auto' }}>
				{filteredTodos.length === 0
					? <div data-testid='todo-empty' className={styles.noItems}>Задач нет</div>
					: filteredTodos.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							setStatus={setStatus}
						/>
					))}
			</div>

			<OptionsBar
				todosLeft={todosLeft}
				category={category}
				setCategory={setCategory}
				clearCompleted={clearCompleted}
			/>

		</div >
	)
}

export default TodosList