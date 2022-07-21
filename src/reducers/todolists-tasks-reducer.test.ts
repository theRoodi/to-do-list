import {TasksStateType, TodoListsType} from '../App';
import {addTodoListAC, todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListState: Array<TodoListsType> = []

    const action = addTodoListAC('new todo')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodoLists).toBe(action.todoListID)
})