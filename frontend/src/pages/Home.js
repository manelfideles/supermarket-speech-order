import { React, useState } from 'react';
import '../css/Home.css';
import number1 from '../assets/1.svg';
import number2 from '../assets/2.svg';
import number3 from '../assets/3.svg';
import Step from '../components/Step';
import MainButton from '../components/MainButton';


function getRoute(path) {
    let args = Array.prototype.slice.call(arguments, 1);
    let count = -1;
    return path.replace(/:[a-zA-Z?]+/g, function (match) {
        count += 1;
        return args[count] !== undefined ? args[count] : match;
    });
};

function Home() {
    // window.location.reload(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') != null);
    console.log(loggedIn);
    if (loggedIn) {
        <div>
            <section class="hero">
                <h1>Ordering groceries is just one phone call away.</h1>
                <MainButton href={getRoute('/order/:userId', localStorage.getItem('userId'))} title='Get Started' />
            </section>
            <section class="steps">
                <Step
                    imageSrc={number1}
                    altName='step1'
                    stepTitle='Write down your order.'
                    stepBodyText='To order, simply insert your order in the text box that appears in the order tab.'
                />
                <Step
                    imageSrc={number2}
                    altName='step2'
                    stepTitle='Double-check your order.'
                    stepBodyText="You're almost there! Check if everything is according to the example above. When that's done, you're ready to move on to step 3."
                />
                <Step
                    imageSrc={number3}
                    altName='step3'
                    stepTitle='Hit enter to order.'
                    stepBodyText="Hit enter and... that's it. You're done! Enjoy your groceries :)"
                />
            </section>
        </div>
    }
    return (
        <div>
            <section class="hero">
                <h1>Ordering groceries is just one phone call away.</h1>
                <MainButton href='/login' title='Get Started' />
            </section>
            <section class="steps">
                <Step
                    imageSrc={number1}
                    altName='step1'
                    stepTitle='Write down your order.'
                    stepBodyText='To order, simply insert your order in the text box that appears in the order tab.'
                />
                <Step
                    imageSrc={number2}
                    altName='step2'
                    stepTitle='Double-check your order.'
                    stepBodyText="You're almost there! Check if everything is according to the example above. When that's done, you're ready to move on to step 3."
                />
                <Step
                    imageSrc={number3}
                    altName='step3'
                    stepTitle='Hit enter to order.'
                    stepBodyText="Hit enter and... that's it. You're done! Enjoy your groceries :)"
                />
            </section>
        </div>
    )
}

export default Home;