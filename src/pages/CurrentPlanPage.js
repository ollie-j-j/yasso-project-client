import React, { useEffect, useState, useContext } from 'react';
import './CurrentPlanPage.css';
import EditPlanForm from '../components/EditPlanForm';
import planMethods from '../services/plans.service';
import { AuthContext } from "../context/auth.context";

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

    return (
        <div className="current-plan-content">
            <div className='text-container'>
                <h1>current plan</h1>
                <p>edit your plan below, mark a run as complete and add notes</p>
            </div>
            {trainingPlan && <EditPlanForm initialTrainingPlan={trainingPlan} />}
        </div>
    );
}

export default CurrentPlanPage;
