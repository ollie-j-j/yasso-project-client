import React from 'react';
import { Button } from "@material-tailwind/react";
import './GettingStartedPage.css';

function GettingStartedPage() {
    return (
        <div className="main-content">
            <div className='text-container'>
                <h1>getting started</h1>
                <p>yasso helps you create running training plans that shift with your circumstances.</p>
                <br></br>
                <p>sometimes life intervenes with training - yasso will help you recalibrate your week’s running</p>
                <br></br>
                <p>add the details of your current plan to get started. don’t have a plan, yasso can generate one for you</p>
            </div>
            <div className='button-container'>
                <Button className='button'>add plan</Button>
                <Button className='button' disabled>generate plan</Button>
            </div>
        </div>
  )
}

export default GettingStartedPage;