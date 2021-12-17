import React from 'react'
import '../css/SubmitButton.css'

function SubmitButton(props) {
    return (
        <div class='subbtn'>
            <button class="submit">{props.title}</button>
        </div>
    )
}

export default SubmitButton;