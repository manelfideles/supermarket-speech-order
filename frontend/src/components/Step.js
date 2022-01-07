import React from 'react'
import '../css/Step.css'

function Step(props) {
    return (
        <div class="step">
            <img src={props.imageSrc} alt={props.altName} />
            <h2>{props.stepTitle}</h2>
            <p>{props.stepBodyText}</p>
        </div>
    )
}

export default Step;