import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import todoList from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'css', isDone: false},
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'html', isDone: false},
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'html', isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'fish', isDone: true},
            {id: v1(), title: 'meat', isDone: false},
            {id: v1(), title: 'orange', isDone: true},
            {id: v1(), title: 'apple', isDone: true},
        ]
    })


    const addTask = (title: string, todoId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let task = tasks[todoId]
        let newTodoTask = [newTask, ...task]
        tasks[todoId] = newTodoTask
        setTasks({...tasks})
    }

    const removeTask = (taskID: string, todoId: string) => {
        let task = tasks[todoId]
        let filteredTasks = task.filter(task => task.id !== taskID)
        tasks[todoId] = filteredTasks
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        let task = tasks[todoId]
        let t = task.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        tasks[todoId] = t
        setTasks({...tasks})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoId: string) => {
        let todoList = todoLists.find(t => t.id === todoId)
        if (todoList) {
            todoList.filter = filter
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoId: string) => {
        let filteredTodo = todoLists.filter(t => t.id !== todoId)
        setTodoLists(filteredTodo)
        delete tasks[todoId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {

                todoLists.map(t => {
                    let tasksRender;
                    switch (t.filter) {
                        case 'active':
                            tasksRender = tasks[t.id].filter(t => !t.isDone)
                            break
                        case 'completed':
                            tasksRender = tasks[t.id].filter(t => t.isDone)
                            break
                        default:
                            tasksRender = tasks[t.id]
                    }
                    return (
                        <TodoList
                            key={t.id}
                            id={t.id}
                            changeTaskStatus={changeTaskStatus}
                            title={t.title}
                            tasks={tasksRender}
                            removeTask={removeTask}
                            changeTodoListFilter={changeTodoListFilter}
                            addTask={addTask}
                            filter={t.filter}
                            removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
