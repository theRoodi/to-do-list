import {v1} from 'uuid';
import {TodoListsType} from '../App';
import { todoListsReducer } from './todolists-reducer';


test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ]

        const endState = todoListsReducer(startState, {type:'REMOVE-TODOLIST', id: todoListId2})

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

    const endState = todoListsReducer(startState, {type:'ADD-TODOLIST',title: 'new todo', id: v1()})

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todo')
})