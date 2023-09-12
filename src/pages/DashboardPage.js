import React from 'react';
import './DashboardPage.css';
import Dashboard from '../components/Dashboard';

function DashboardPage() {
    return (
        <div className="dashboard-page-main-content">
            <div>
                <Dashboard />
            </div>
        </div>
  )
}

export default DashboardPage;