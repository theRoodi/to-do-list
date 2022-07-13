import {TodoListsType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

type AppType = RemoveTodoListAT | AddTodoListAT

export const todoListsReducer = (todoLists: Array<TodoListsType>, action:AppType):Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{ id: action.id, title: action.title, filter: 'all'}, ...todoLists]
        default:
            return todoLists
    }

}