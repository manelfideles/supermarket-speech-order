import React from 'react'
import '../css/MainButton.css';

function MainButton(props) {
    return (
        <a href={props.href} class="button">{props.title}</a>
    )
}

export default MainButton;