import React, { useEffect, useState, useContext } from 'react';
import './CurrentPlanPage.css';
import EditPlanForm from '../components/Plans/EditPlanForm';
import planMethods from '../services/plans.service';
import { AuthContext } from "../context/auth.context";
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function CurrentPlanPage() {
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
            <div className="current-plan-content">
                <div className='text-container'>
                    <h1>current plan</h1>
                    <p>edit your plan below, mark a run as complete and add notes</p>
                </div>
                <EditPlanForm initialTrainingPlan={trainingPlan} />
            </div>
        );
    } else {
        return (
            <div className="current-plan-content">
                <div className='text-container'>
                    <h1>no plan!</h1>
                    <p>You don't have a training plan yet,</p>
                    <p>please add one to get started!</p>
                    <Link to="/onboarding/add-plan"><Button className='add-plan-button'>Add Plan</Button></Link>
                </div>
            </div>
        );
    }
}

export default CurrentPlanPage;

