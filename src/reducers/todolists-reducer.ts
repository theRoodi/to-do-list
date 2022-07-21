import {FilterValuesType, TodoListsType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}


type AppType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todoListsReducer = (todoLists: Array<TodoListsType>, action: AppType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todoListID, title: action.title, filter: 'all'}, ...todoLists]
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        default:
            return todoLists
    }

}


export const removeTodoListAC = (id: string): RemoveTodoListAT => ({
    type: 'REMOVE-TODOLIST',
    id: id
})

export const addTodoListAC = (title: string): AddTodoListAT => ({
    type: 'ADD-TODOLIST',
    title: title,
    todoListID: v1()
})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filter,
    id: id
})

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title: title,
    id: id
})
