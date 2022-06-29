import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    className?: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const changeEditModeHandler = () => {
        setEditMode(!editMode)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input onChange={onChangeTitleHandler} value={title} onBlur={changeEditModeHandler} autoFocus/>
            : <span onDoubleClick={changeEditModeHandler} className={props.className}>{props.title}</span>
    );
};
