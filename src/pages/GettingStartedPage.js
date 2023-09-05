import React from 'react';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import './GettingStartedPage.css';

function GettingStartedPage() {
    return (
        <div className="getting-started-main-content">
            <div className='getting-started-text-container'>
                <h1>getting started</h1>
                <p>yasso helps you create running training plans that shift with your circumstances.</p>
                <br></br>
                <p>sometimes life intervenes with training - yasso will help you recalibrate your week’s running</p>
                <br></br>
                <p>add the details of your current plan to get started. don’t have a plan, yasso can generate one for you</p>
            </div>
            <div className='getting-started-button-container'>
                <Link to="add-plan"><Button className='add-plan-button'>add plan</Button></Link>
                <Button className='generate-plan-button' disabled>generate plan</Button>
            </div>
        </div>
  )
}

export default GettingStartedPage;