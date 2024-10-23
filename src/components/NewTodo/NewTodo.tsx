import { useState } from "react";
import { StatusTypes, Todo } from "../../types/types"
import styles from './NewTodo.module.css'


interface NewTodoProps {
	visible: boolean;
	setVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
	createNewTodo: (newTodo: Todo) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ visible, setVisible, createNewTodo }) => {
	const [description, setDescription] = useState('')

	function newTodoHandle() {
		let newTodo: Todo = {
			id: Date.now(),
			description: description,
			status: StatusTypes.ACTIVE
		}

		if (description.length === 0) {
			alert('Введите описание задачи')
			return
		}

		setDescription('')
		createNewTodo(newTodo)
	}

	function showHandler() {
		setVisible((prev: boolean) => !prev)
	}

	return (
		<div className={styles.wrapper}>
			<span
				className={visible ? styles.icon + ' ' + styles.active : styles.icon}
				onClick={() => showHandler()}>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="1.5">
					<path d="M7 14.5L12 9.5L17 14.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</span>
			<input
				className={styles.todoInput}
				type="text"
				value={description}
				placeholder="What needs to be done?"
				onChange={e => setDescription(e.target.value)}
				onKeyUp={(e) => e.key === 'Enter' ? newTodoHandle() : null}
			/>
		</div>
	)
}

export default NewTodo