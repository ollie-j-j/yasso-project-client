import React, { useEffect } from 'react';
import './PlanAddedPage.css';
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import confetti from 'canvas-confetti';

function PlanAddedPage() {

    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
        });
    }, []);

    return (
        <div className="plan-added-main-content">
            <div className='plan-added-text-container'>
                <h1>plan added!</h1>
                <p>Click the view plan button to view you plan and edit it plan manually</p>
                <br />
                <p>Click on the update availability button to have yasso update your training plan according to your schedule</p>
            </div>
            <div className='plan-added-button-container'>
                <Link to="current-plan"><Button className='view-plan-button'>view plan</Button></Link>
                <Link to="update-availability"><Button className='update-plan-button' disabled>update availability</Button></Link>
            </div>
        </div>
    )
}

export default PlanAddedPage;