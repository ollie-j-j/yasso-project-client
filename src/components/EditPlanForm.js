import React from 'react';
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import planMethods from "../services/plans.service";
import './EditPlanForm.css';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Input,
    Button,
    Radio,
} from "@material-tailwind/react";
import UpdateRunDialog from './UpdateRunDialog';
import DeletePlanDialog from './DeletePlanDialog';
import RevertPlanDialog from './RevertPlanDialog';

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

function EditPlanForm({ initialTrainingPlan }) {
    console.log('Rendering EditPlanForm');

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const [editedPlan, setEditedPlan] = useState(initialTrainingPlan);

    const [trainingPlan, setTrainingPlan] = useState(initialTrainingPlan);
    const [originalPlan, setOriginalPlan] = useState(null);


    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [revertDialogOpen, setRevertDialogOpen] = useState(false);


    const navigate = useNavigate();

    const { getToken, user } = useContext(AuthContext);
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



    useEffect(() => {
        console.log('Updating editedPlan with new trainingPlan');
        setEditedPlan(trainingPlan);
    }, [trainingPlan]);



    const handleChange = (e) => {
        console.log('handleChange called');
        let day, field, value;
        day = e.target.name.split('-')[0];
        field = e.target.name.split('-')[1];

        if (e.target.type === "radio") {
            value = e.target.checked ? e.target.value : '';
        } else {
            value = e.target.value;
        }

        setTrainingPlan(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value,
            }
        }));
    };




    const handleSubmit = (e) => {
        e.preventDefault();


        console.log('Edited Plan:', editedPlan);
        console.log('Token:', token);


        const planId = trainingPlan._id;

        planMethods.updatePlan(planId, editedPlan, token)
            .then((response) => {
                console.log('Training plan updated successfully:', response);
                console.log('Response Data:', response.data);
                console.log('Before Update:', trainingPlan);
                setTrainingPlan(response.data);
                console.log('After Update:', trainingPlan);
                setUpdateDialogOpen(true);
                navigate("/onboarding/plan-added/current-plan");
            })
            .catch(err => {
                console.error('Error:', err);
                console.error('Error Response:', err.response.data);
            });
    };


    const handleDelete = (e) => {
        if (e) e.preventDefault();
        const userId = user._id;
        planMethods.deletePlan(userId, token)
            .then(response => {
                console.log(response.data);
                navigate('/onboarding/add-plan');
                setDeleteDialogOpen(false);
            })
            .catch(error => {
                console.log(error);
            });
    };



    useEffect(() => {
        planMethods.getOriginalPlan(token)
            .then(response => {
                console.log("Original Plan Response:", response.data);
                setOriginalPlan(response.data);
            })
            .catch(error => {
                console.error('Error fetching the original plan:', error);
            });
    }, [token]);
    

    

    const handleRevert = (e) => {
        console.log("handleRevert called");
        if (e) e.preventDefault();
        if (!originalPlan || !originalPlan.data || !originalPlan.data._id) {
            console.error('Original plan or its ID is not set');
            return;
        }
        const planId = originalPlan.data._id;
        planMethods.revertPlan(planId, token)
            .then(response => {
                console.log(response.data);
                planMethods.getCurrentPlan(token)
                    .then(response => {
                        const currentPlan = response.data;
                        setTrainingPlan(currentPlan);
                    })
                    .catch(error => {
                        console.error('Error fetching the current plan:', error);
                    });
                navigate('/onboarding/plan-added/current-plan');
                setRevertDialogOpen(false);
            })
            .catch(error => {
                console.log(error);
            });
    };
    



    return (
        <>
            <div className='w-1/3 mx-auto edit-accordian-container'>
                <form onSubmit={handleSubmit}>
                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(1)}>Monday</AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="monday-distance" value={trainingPlan.monday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="monday-sessionDetails" value={trainingPlan.monday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="monday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.monday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.monday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.monday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.monday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.monday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.monday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.monday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.monday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.monday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.monday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="monday-sessionNotes" value={trainingPlan.monday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="monday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="monday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.monday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.monday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="monday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.monday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                            Tuesday
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="tuesday-distance" value={trainingPlan.tuesday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="tuesday-sessionDetails" value={trainingPlan.tuesday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="tuesday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.tuesday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.tuesday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.tuesday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.tuesday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.tuesday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.tuesday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.tuesday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.tuesday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.tuesday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.tuesday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="tuesday-sessionNotes" value={trainingPlan.tuesday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="tuesday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="tuesday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.tuesday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.tuesday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="tuesday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.tuesday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                            Wednesday
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="wednesday-distance" value={trainingPlan.wednesday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="wednesday-sessionDetails" value={trainingPlan.wednesday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="wednesday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.wednesday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.wednesday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.wednesday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.wednesday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.wednesday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.wednesday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.wednesday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.wednesday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.wednesday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.wednesday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="wednesday-sessionNotes" value={trainingPlan.wednesday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="wednesday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="wednesday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.wednesday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.wednesday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="wednesday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.wednesday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(4)}>
                            Thursday
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="thursday-distance" value={trainingPlan.thursday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="thursday-sessionDetails" value={trainingPlan.thursday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="thursday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.thursday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.thursday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.thursday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.thursday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.thursday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.thursday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.thursday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.thursday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.thursday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.thursday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="thursday-sessionNotes" value={trainingPlan.thursday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="thursday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="thursday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.thursday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.thursday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="thursday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.thursday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(5)}>
                            Friday
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="friday-distance" value={trainingPlan.friday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="friday-sessionDetails" value={trainingPlan.friday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="friday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.friday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.friday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.friday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.friday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.friday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.friday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.friday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.friday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.friday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.friday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="friday-sessionNotes" value={trainingPlan.friday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="friday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="friday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.friday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.friday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="friday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.friday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(6)}>
                            Saturday
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="saturday-distance" value={trainingPlan.saturday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="saturday-sessionDetails" value={trainingPlan.saturday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="saturday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.saturday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.saturday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.saturday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.saturday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.saturday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.saturday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.saturday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.saturday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.saturday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.saturday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="saturday-sessionNotes" value={trainingPlan.saturday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="saturday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="saturday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.saturday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.saturday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="saturday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.saturday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(7)}>
                            Sunday
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="sunday-distance" value={trainingPlan.sunday.distance} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="sunday-sessionDetails" value={trainingPlan.sunday.sessionDetails} onChange={handleChange} />
                                <div className="radio-container" name="sunday-typeOfSession">
                                    <div className="radio-button">
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="easy"
                                            value="easy"
                                            checked={trainingPlan.sunday.typeOfSession === 'easy'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="steady"
                                            value="steady"
                                            checked={trainingPlan.sunday.typeOfSession === 'steady'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="tempo"
                                            value="tempo"
                                            checked={trainingPlan.sunday.typeOfSession === 'tempo'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="threshold"
                                            value="threshold"
                                            checked={trainingPlan.sunday.typeOfSession === 'threshold'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="fartlek"
                                            value="fartlek"
                                            checked={trainingPlan.sunday.typeOfSession === 'fartlek'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="yasso"
                                            value="yasso"
                                            checked={trainingPlan.sunday.typeOfSession === 'yasso'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="interval"
                                            value="interval"
                                            checked={trainingPlan.sunday.typeOfSession === 'interval'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="long run"
                                            value="long run"
                                            checked={trainingPlan.sunday.typeOfSession === 'long run'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="rest"
                                            value="rest"
                                            checked={trainingPlan.sunday.typeOfSession === 'rest'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-typeOfSession"
                                            label="recovery"
                                            value="recovery"
                                            checked={trainingPlan.sunday.typeOfSession === 'recovery'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Input size="lg" label="Session Notes" name="sunday-sessionNotes" value={trainingPlan.sunday.sessionNotes} onChange={handleChange} />
                                <div className="run-status-radio-container" name="sunday-status">
                                    <div className="radio-button">
                                        <Radio
                                            name="sunday-status"
                                            label="pending"
                                            value="pending"
                                            checked={trainingPlan.sunday.status === 'pending'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-status"
                                            label="complete"
                                            value="complete"
                                            checked={trainingPlan.sunday.status === 'complete'}
                                            onChange={handleChange}
                                        />
                                        <Radio
                                            name="sunday-status"
                                            label="missed"
                                            value="missed"
                                            checked={trainingPlan.sunday.status === 'missed'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <div className='button-container'>
                        <Button className="mt-6" fullWidth type="submit">
                            update plan
                        </Button>
                        <Button onClick={() => setDeleteDialogOpen(true)} className="mt-6" fullWidth>
                            delete plan
                        </Button>
                        <Button onClick={() => setRevertDialogOpen(true)} className="mt-6" fullWidth>
                            revert to original
                        </Button>
                    </div>
                </form>
                <UpdateRunDialog open={updateDialogOpen}
                    handleOpen={() => setUpdateDialogOpen(!updateDialogOpen)}
                />
                <DeletePlanDialog
                    open={deleteDialogOpen}
                    handleOpen={() => setDeleteDialogOpen(!deleteDialogOpen)}
                    onConfirmDelete={handleDelete}
                />
                <RevertPlanDialog
                    open={revertDialogOpen}
                    handleOpen={() => setRevertDialogOpen(!revertDialogOpen)}
                    onConfirmRevert={handleRevert}
                />
            </div>
        </>
    );
}

export default EditPlanForm;