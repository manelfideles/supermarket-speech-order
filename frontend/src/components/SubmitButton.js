import React from 'react';
import '../css/SubmitButton.css';

// create POST function here

function SubmitButton(props) {
    return (
        <div class='subbtn'>
            <button class="submit" disabled={props.active_}>{props.title}</button>
        </div>
    )
}

export default SubmitButton;