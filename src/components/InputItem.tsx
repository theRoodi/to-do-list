import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                onChange={onChangeInputHandler}
                value={title}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : 'input'}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error_input'}>Enter title! </div>}
        </div>
    );
};
