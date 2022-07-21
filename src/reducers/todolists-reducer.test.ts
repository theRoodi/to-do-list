import {v1} from 'uuid';
import {FilterValuesType, TodoListsType} from '../App';
import {
    addTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todolists-reducer';


test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId1)
})


test('correct todolist should be added', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todoListsReducer(startState,  addTodoListAC('new todo', v1()))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todo')
})

test('todolist title should be changed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC('new todo', todoListId2))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('new todo')
})

test('todolist filter should be changed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()
    const newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListsType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(newFilter, todoListId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})