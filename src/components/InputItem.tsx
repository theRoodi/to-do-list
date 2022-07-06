import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons';

export type InputItemPropsType = {
    addItem: (title: string ) => void
}

export const InputItem = (props: InputItemPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle )
            setTitle('')
        }else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField id="outlined"
                       label="Title"
                       defaultValue="Hello World"
                       variant="outlined"
                       size={'small'}
                       onChange={onChangeInputHandler}
                       value={title}
                       onKeyDown={onKeyDownHandler}
                       error={error}
                       helperText={error && "Enter title!"}
            />
            <IconButton onClick={addTask}><AddCircleOutline fontSize={'small'}/></IconButton>
        </div>
    );
};
