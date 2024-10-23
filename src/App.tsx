import './App.css'
import { useEffect, useState } from "react"
import TodosList from "./components/TodosList/TodosList"
import { StatusTypes, Todo, TodoStatusType } from "./types/types"
import NewTodo from "./components/NewTodo/NewTodo"


function App() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [visible, setVisible] = useState(false)


	useEffect(() => {
		todos.length !== 0 ? setVisible(true) : setVisible(false)
	}, [todos])

	function createNewTodo(newTodo: Todo) {
		setTodos([...todos, newTodo])
	}

	function clearCompleted() {
		setTodos(todos.filter(todo => todo.status !== StatusTypes.COMPLETED))
	}

	function setStatus(newStatus: TodoStatusType, todo: Todo) {
		setTodos(todos.map(el => {
			if (el.id === todo.id) el.status = newStatus
			return el
		}))
	}

	return (
		<div className="wrapper">
			<div className="container">
				<div className="header">
					<h1>todos</h1>
				</div>

				<div className="content">
					<NewTodo visible={visible} setVisible={setVisible} createNewTodo={createNewTodo} />
					{visible && <TodosList todos={todos} clearCompleted={clearCompleted} setStatus={setStatus} />}
				</div>

			</div>
		</div>
	)
}

export default App
