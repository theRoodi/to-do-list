import React from 'react';
import {FilterValuesType} from './App';
import {InputItem} from './components/InputItem';
import {EditableSpan} from './components/EditableSpan';

type TodoListPropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoId: string) => void
    addTask: (task: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoID: string, newTitle: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {

    let tasksRender = props.tasks.length ? props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }

        const onChangeHandler = (newTitle: string) => {
            props.changeTaskTitle(task.id, newTitle, props.id)
        }

        return (
            <li key={task.id}>
                <input
                    onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}
                    type="checkbox"
                    checked={task.isDone}/>
                <EditableSpan title={task.title}  className={task.isDone ? 'isDone' : ''} onChange={onChangeHandler}/>
                <button onClick={removeTask}> x</button>
            </li>
        )
    }) : (
        <div>Your tasks is done!</div>
    )
    const onClickHandler = (status: FilterValuesType) => props.changeTodoListFilter(status, props.id)


    const onClickDeleteHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onChangeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodoListTitle}/>
                <button onClick={onClickDeleteHandler}>X</button>
            </h3>
            <InputItem addItem={addTask}/>
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