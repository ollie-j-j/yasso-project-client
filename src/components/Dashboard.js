import React from "react";
import { useState, useContext, useEffect } from "react";
import planMethods from "../services/plans.service";
import { AuthContext } from "../context/auth.context";
import PieChart from './PieChart';
import { Spinner } from "@material-tailwind/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import TableDashboardOverview from "./TableDashboardOverview";
import SessionNotes from "./SessionNotes";

function Dashboard() {
    const [trainingData, setTrainingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getToken } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [selectedTab, setSelectedTab] = useState("dashboard");


    useEffect(() => {
        setToken(getToken());
    }, [getToken]);

    useEffect(() => {
        if (!token) return;

        planMethods.getCurrentPlan(token)
            .then(response => {
                const currentDays = Object.values(response.data);

                const totalDistanceCompleted = currentDays.reduce((acc, session) => {
                    if (session && session.status === "complete") {
                        return acc + session.distance;
                    }
                    return acc;
                }, 0);

                const totalDistance = currentDays.reduce((acc, session) => {
                    if (session && (session.status === "complete" || session.status === "pending" || session.status === "missed")) {
                        return acc + session.distance;
                    }
                    return acc;
                }, 0);

                const sessionsCompleted = currentDays.reduce((acc, session) => {
                    if (session.status === "complete") {
                        return acc + 1;
                    }
                    return acc;
                }, 0);

                const missedSessions = currentDays.reduce((acc, session) => {
                    if (session.status === "missed") {
                        return acc + 1;
                    }
                    return acc;
                }, 0);

                const aerobicTotal = currentDays.reduce((acc, session) => {
                    if (session && (session.typeOfSession === "easy" || session.typeOfSession === "steady")) {
                        return acc + session.distance;
                    }
                    return acc;
                }, 0);

                const aerobicTotalPercentage = Math.floor((aerobicTotal / totalDistance) * 100);

                const pendingSessions = currentDays.reduce((acc, session) => {
                    if (session.status === "pending") {
                        return acc + 1;
                    }
                    return acc;
                }, 0);

                const sessionTypesCount = currentDays.reduce((acc, session) => {
                    if (!session.typeOfSession) return acc;

                    if (!acc[session.typeOfSession]) {
                        acc[session.typeOfSession] = 1;
                    } else {
                        acc[session.typeOfSession]++;
                    }
                    return acc;
                }, {});

                const pieChartData = Object.entries(sessionTypesCount).map(([key, value]) => {
                    return {
                        id: key,
                        label: key,
                        value: value,
                    };
                });

                const sessionNotesData = currentDays.map(session => {
                    return {
                        day: session.day,
                        sessionNotes: session.sessionNotes,
                        status: session.status
                    };
                });



                setTrainingData({
                    data: response.data,
                    totalDistanceCompleted: totalDistanceCompleted,
                    totalDistance: totalDistance,
                    sessionsCompleted: sessionsCompleted,
                    missedSessions: missedSessions,
                    aerobicTotalPercentage: aerobicTotalPercentage,
                    pendingSessions: pendingSessions,
                    pieChartData: pieChartData,
                    sessionNotesData: sessionNotesData,
                });

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the training data:', error);
                setLoading(false);
            });
    }, [token]);


    if (loading) return (

        <div className="spinner-container">
            <Spinner className="h-10 w-10" />
        </div>
    );
    const tabData = [
        {
            label: "overview",
            value: "dashboard",
            component: <TableDashboardOverview data={trainingData} />
        },
        {
            label: "sessions breakdown",
            value: "sessionTypes",
            component: <PieChart data={trainingData} />
        },
        {
            label: "training diary & status",
            value: "settings",
            component: <SessionNotes data={trainingData} />
        },
    ];


    return (
        <div>
            <Tabs value={selectedTab} className="w-full max-w-screen-xl mx-auto">
                <TabsHeader>
                    {tabData.map(({ label, value }) => (
                        <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {tabData.map(({ value, component }) => (
                        <TabPanel key={value} value={value}>
                            {component}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );

}

export default Dashboard;