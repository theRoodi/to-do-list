import React from 'react';
import {FilterValuesType} from './App';
import {InputItem} from './components/InputItem';
import {EditableSpan} from './components/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
                <Checkbox onChange={(e) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}
                          checked={task.isDone}
                          color="primary"
                          size={'small'}/>

                <EditableSpan title={task.title}  className={task.isDone ? 'isDone' : ''} onChange={onChangeHandler}/>
                <IconButton size={'small'} onClick={removeTask}><Delete fontSize={'small'} /></IconButton>
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
                <IconButton onClick={onClickDeleteHandler}><Delete/></IconButton>
            </h3>
            <InputItem addItem={addTask}/>
            <ul style={{listStyle: 'none'}}>
                {tasksRender}
            </ul>
            <div>
                <Button variant="outlined"
                        color={props.filter === 'all' ? 'secondary' : 'default'}
                        size={'small'}
                        disableElevation
                        onClick={() => onClickHandler('all')}>All
                </Button>
                <Button variant="outlined"
                        color={props.filter === 'active' ? 'secondary' : 'default'}
                        size={'small'}
                        disableElevation
                        onClick={() => onClickHandler('active')}>Active
                </Button>
                <Button variant="outlined"
                        color={props.filter === 'completed' ? 'secondary' : 'default'}
                        size={'small'}
                        disableElevation
                        onClick={() => onClickHandler('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList