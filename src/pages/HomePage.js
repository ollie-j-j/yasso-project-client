import React, { useContext } from 'react';
import './HomePage.css';
import { AuthContext } from "../context/auth.context";
import DashboardCard from '../components/HomePage/DashboardCard';
import LearnCard from '../components/HomePage/LearnCard';
import PlansCard from '../components/HomePage/PlansCard';
import ProfileCard from '../components/HomePage/ProfileCard';

function HomePage() {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return (
            <div className="home-content">
                <div className='card-container'>
                    <DashboardCard />
                    <LearnCard />
                    <PlansCard />
                    <ProfileCard />
                </div>
            </div>
        );
    } else {
        return (
        <div>
            <div className = "main-content">
                <h1>yasso</h1>
                <img src="/yasso-logo.png" alt="yasso-logo" />
            </div >
        </div>
        );
    }
}

export default HomePage;