import React from 'react'
import '../css/MainButton.css';

function MainButton(props) {
    return (
        <button href={props.href}>{props.title}</button >
    )
}

export default MainButton;