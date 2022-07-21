import {TasksStateType, TodoListsType} from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {v1} from 'uuid';
import {addTodoListAC, removeTodoListAC, todoListsReducer} from './todolists-reducer';


test('correct task should be removed', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'css', isDone: false},
            {id: '3', title: 'html', isDone: true}
        ],
        'todoListId2': [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false},
            {id: '3', title: 'fish', isDone: true}
        ]
    }

    const action = removeTaskAC('2', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(2)
    expect(endState['todoListId2'].every(t => t.id != '2')).toBeTruthy()
});

test(' task should be added', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'css', isDone: false},
            {id: '3', title: 'html', isDone: true}
        ],
        'todoListId2': [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false},
            {id: '3', title: 'fish', isDone: true}
        ]
    }

    const action = addTaskAC('juice', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()
    expect(endState['todoListId2'][0].title).toBe('juice')
    expect(endState['todoListId2'][0].isDone).toBe(false)
});

test(' task status should be changed', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'css', isDone: false},
            {id: '3', title: 'html', isDone: true}
        ],
        'todoListId2': [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false},
            {id: '3', title: 'fish', isDone: true}
        ]
    }

    const action = changeTaskStatusAC('2',false, 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][1].isDone).toBeFalsy()
    expect(endState['todoListId2'][1].isDone).toBeFalsy()
});

test(' title status should be changed', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'css', isDone: false},
            {id: '3', title: 'html', isDone: true}
        ],
        'todoListId2': [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false},
            {id: '3', title: 'fish', isDone: true}
        ]
    }

    const action = changeTaskTitleAC('2','new title', 'todoListId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todoListId1'][1].title).toBe('css')
    expect(endState['todoListId2'][1].title).toBe('new title')
});


test('new props with array should be added when correct todolist been added', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'css', isDone: false},
            {id: '3', title: 'html', isDone: true}
        ],
        'todoListId2': [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false},
            {id: '3', title: 'fish', isDone: true}
        ]
    }

    const action = addTodoListAC('new title')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
    if (!newKey){
        throw Error(" need add new key!")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('props with todolistID should be removed', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'css', isDone: false},
            {id: '3', title: 'html', isDone: true}
        ],
        'todoListId2': [
            {id: '1', title: 'milk', isDone: true},
            {id: '2', title: 'bread', isDone: false},
            {id: '3', title: 'fish', isDone: true}
        ]
    }


    const action = removeTodoListAC('todoListId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).toBeUndefined()
})