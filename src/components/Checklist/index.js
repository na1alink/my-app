import React, { useState, useEffect } from 'react'
import '../../Checklist.css'

const Checklist = () => {
	const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState('')


    

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
		setTasks(storedTasks)
	}, [])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])




	const addTask = () => {
		if (newTask.trim() !== '') {
			setTasks([...tasks, { text: newTask, completed: false }])
			setNewTask('')
		}
	}

	const deleteTask = index => {
		const updatedTasks = [...tasks]
		updatedTasks.splice(index, 1)
		setTasks(updatedTasks)
	}

	const toggleTask = index => {
		const updatedTasks = [...tasks]
		updatedTasks[index].completed = !updatedTasks[index].completed
		setTasks(updatedTasks)
	}

	const editTask = (index, newText) => {
		const updatedTasks = [...tasks]
		updatedTasks[index].text = newText
		setTasks(updatedTasks)
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			addTask()
		}
	}

	return (
		<div className='Checklist'>
			<h1 className='Checklist-title'>Все задачи</h1>

			<div className='Checklist-top'>
				<input
					className='Checklist-input'
					type='text'
					value={newTask}
					placeholder='Новая задача'
					onFocus={e => (e.target.placeholder = '')}
					onChange={e => setNewTask(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<button type='button' className='Checklist-btn btn' onClick={addTask}>
					+
				</button>
			</div>

			<ul className='Checlist-list'>
				{tasks.map((task, index) => (
					<li className='Checlist-Item Item' key={index}>
						<div className='Item-left'>
							<input
								className='Item-checkbox'
								type='checkbox'
								checked={task.completed}
								onChange={() => toggleTask(index)}
							/>
							<span
								className='Item-text'
								style={{
									textDecoration: task.completed ? 'line-through' : 'none',
								}}
							>
								{task.text}
							</span>
						</div>
						<button
							className='Item-btn-edit'
							onClick={() => {
								const newText = prompt('Edit task:', task.text)
								if (newText !== null) {
									editTask(index, newText)
								}
							}}
						></button>
						<button
							className='Item-btn-del'
							onClick={() => deleteTask(index)}
						></button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Checklist
