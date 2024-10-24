import React from 'react';
import { act } from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { StatusTypes, Todo } from './types/types';

describe('Tests', () => {

	let todosMock: Todo[] = []

	beforeEach(() => {
		todosMock = [
			{ id: 1, description: '1 elem', status: StatusTypes.ACTIVE },
			{ id: 2, description: '2 elem', status: StatusTypes.ACTIVE },
			{ id: 3, description: '3 elem', status: StatusTypes.COMPLETED },
			{ id: 4, description: '4 elem', status: StatusTypes.COMPLETED },
			{ id: 5, description: '5 elem', status: StatusTypes.COMPLETED },
		];

	})

	test('Renders all todos', () => {

		act(() => {
			render(<App initialTodosState={todosMock} />)
		})

		const todosEmpty = screen.queryByTestId('todo-empty')
		const todoElems = screen.getAllByTestId('todo-item')

		expect(todosEmpty).toBeNull()
		expect(todoElems).toHaveLength(5)

	})

	test('Adding new todo', () => {

		render(<App />)
		const newTodoInput = screen.getByTestId('new-todo')

		expect(screen.queryByTestId('todo-item')).toBeNull()

		act(() => {
			userEvent.type(newTodoInput, `First todo`)
			fireEvent.keyUp(newTodoInput, { key: 'Enter' })
		})

		const todo = screen.getByText('First todo')
		expect(screen.getAllByTestId('todo-item')).toHaveLength(1)
		expect(todo).toBeInTheDocument()
	})

	test('Render only active todos', () => {

		render(<App initialTodosState={todosMock} />)
		const btnActive = screen.getByTestId('category-active')

		expect(screen.getAllByTestId('todo-item')).toHaveLength(5)

		act(() => {
			userEvent.click(btnActive)
		})

		expect(screen.getAllByTestId('todo-item')).toHaveLength(2)
	})

	test('Render only completed todos', () => {

		render(<App initialTodosState={todosMock} />)
		const btnCompleted = screen.getByTestId('category-completed')

		expect(screen.getAllByTestId('todo-item')).toHaveLength(5)

		act(() => {
			userEvent.click(btnCompleted)
		})

		expect(screen.getAllByTestId('todo-item')).toHaveLength(3)
	})

	test('Remove completed todos', () => {

		render(<App initialTodosState={todosMock} />)
		const btnClearCompleted = screen.getByTestId('clear-completed')

		expect(screen.getAllByTestId('todo-item')).toHaveLength(5)

		act(() => {
			userEvent.click(btnClearCompleted)
		})

		expect(screen.getAllByTestId('todo-item')).toHaveLength(2)
	})

	test('Set active todos to completed', () => {
		todosMock = [
			{ id: 1, description: '1 elem', status: StatusTypes.ACTIVE },
			{ id: 2, description: '2 elem', status: StatusTypes.ACTIVE },
		]

		render(<App initialTodosState={todosMock} />)
		expect(screen.getAllByTestId('todo-item')).toHaveLength(2)

		const btnActive = screen.getByTestId('category-active')
		act(() => {
			screen.getAllByTestId('todo-checkbox').forEach(item => {
				userEvent.click(item)
			})
			userEvent.click(btnActive)
		})

		expect(screen.queryByTestId('todo-item')).toBeNull()
		expect(screen.getByTestId('todo-empty')).toBeInTheDocument()
	})

})