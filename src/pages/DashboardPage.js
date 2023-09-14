import React, { useState, useEffect, useContext } from 'react';
import './DashboardPage.css';
import Dashboard from '../components/Dashboard/Dashboard';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import planMethods from "../services/plans.service";
import { AuthContext } from "../context/auth.context";
import { Spinner } from "@material-tailwind/react";


function DashboardPage() {
    const [trainingData, setTrainingData] = useState(null);
    const [hasPlan, setHasPlan] = useState(false);
    const [loading, setLoading] = useState(true);
    const { getToken } = useContext(AuthContext);

    useEffect(() => {
        const userToken = getToken();
        if (!userToken) {
            setLoading(false);
            return;
        }

        planMethods.getCurrentPlan(userToken)
            .then(data => {
                setTrainingData(data);
                if (data && Object.keys(data).length > 0) {
                    setHasPlan(true);
                }
            })
            .catch(err => {
                console.error("Error fetching current plan:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [getToken]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner className="h-10 w-10" />
            </div>
        )
    }

    return (
        <div className="dashboard-page-main-content">
            {hasPlan ? (
                <Dashboard trainingData={trainingData} />
            ) : (
                <div>
                    <p>you need a plan in order to view a dashboard </p>
                    <p>click the button below to add yours!</p>
                    <Link to="/onboarding/add-plan">
                        <Button className="lowercase text-sm mt-4"> Add Plan </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default DashboardPage;