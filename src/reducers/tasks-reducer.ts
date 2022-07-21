import {FilterValuesType, TasksStateType, TodoListsType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TITLE'
    taskID: string
    title: string
    todoListID: string
}


type AppType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: AppType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id != action.taskID)
            stateCopy[action.todoListID] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListID]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todoListID] = newTasks
            return stateCopy
        }
        case 'CHANGE-STATUS': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListID]
            let task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todoListID]
            let task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todoListID]  = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }

}


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK', taskID, todoListID
})

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({
    type: 'ADD-TASK', title, todoListID
})
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => ({
    type: 'CHANGE-STATUS', isDone, taskID, todoListID
})
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TITLE', title, taskID, todoListID
})
