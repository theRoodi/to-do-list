import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoId: string) => void
    addTask: (task: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    let tasksRender = props.tasks.length ? props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }
        return (
            <li key={task.id}>
                <input
                    onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                <button onClick={removeTask}> x</button>
            </li>
        )
    }) : (
        <div>Your tasks is done!</div>
    )
    const onClickHandler = (status: FilterValuesType) => props.changeTodoListFilter(status, props.id)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const onClickDeleteHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.id)
            setTitle('')
        }else {
            setError(true)
        }
    }
    return (
        <div>
            <h3>{props.title} <button onClick={() => onClickDeleteHandler()}>X</button></h3>
            <div>
                <input
                    onChange={onChangeInputHandler}
                    value={title}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : 'input'}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error_input'}>Enter title! </div>}
            </div>
            <ul>
                {tasksRender}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={() => onClickHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={() => onClickHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={() => onClickHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList