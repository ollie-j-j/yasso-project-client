import React, { useEffect, useState, useContext } from 'react';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import './GettingStartedPage.css';
import planMethods from '../services/plans.service';
import { AuthContext } from "../context/auth.context";

function GettingStartedPage() {
    const [trainingPlan, setTrainingPlan] = useState(null);
    const { getToken } = useContext(AuthContext);
    const token = getToken();

    useEffect(() => {
        planMethods.getCurrentPlan(token)
            .then(response => {
                const currentPlan = response.data;
                setTrainingPlan(currentPlan);
            })
            .catch(error => {
                console.error('Error fetching the current plan:', error);
            });
    }, [token]);

    if (trainingPlan) {
        return (
            <div className="getting-started-main-content">
                <div className='text-container'>
                    <h1>you already have a plan!</h1>
                    <p>click the button below to view your plan</p>
                    <Link to="/current-plan"><Button className='lowercase text-sm'>view plan</Button></Link>
                </div>
            </div>
        );
    } else {

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
                    <Link to="add-plan"><Button className='add-plan-button lowercase text-sm'>add plan</Button></Link>
                    <Button className='generate-plan-button lowercase text-sm' disabled>generate plan</Button>
                </div>
            </div>
        )
    }

}

export default GettingStartedPage;