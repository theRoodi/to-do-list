import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {InputItem} from './components/InputItem';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'active' | 'completed'
    export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
    const changeTodoListTitle = (todoID: string, newTitle: string) => {
        let todoList = todoLists.find(t => t.id === todoID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoId: string) => {
        let task = tasks[todoId]
        let t = task.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        tasks[todoId] = t
        setTasks({...tasks})
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoId: string) => {
        let task = tasks[todoId]
        let t = task.map(t => t.id === taskId ? {...t, title: newTitle} : t)
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

    const addTodoList = (title: string) => {
        const todoList: TodoListsType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []})
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} area-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={'inherit'} variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <InputItem addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
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
                                <Grid item key={t.id}>
                                    <Paper style={{padding: '20px'}} elevation={3}>
                                        <TodoList
                                            id={t.id}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            title={t.title}
                                            tasks={tasksRender}
                                            removeTask={removeTask}
                                            changeTodoListFilter={changeTodoListFilter}
                                            addTask={addTask}
                                            filter={t.filter}
                                            removeTodoList={removeTodoList}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
