import React from 'react';
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import planMethods from "../services/plans.service";
import './OriginalTrainingPlanForm.css';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Input,
    Button,
} from "@material-tailwind/react";

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

function OriginalTrainingPlanForm() {

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const [trainingPlan, setTrainingPlan] = useState({
        monday: { distance: '', typeOfSession: '', sessionDetails: '' },
        tuesday: { distance: '', typeOfSession: '', sessionDetails: '' },
        wednesday: { distance: '', typeOfSession: '', sessionDetails: '' },
        thursday: { distance: '', typeOfSession: '', sessionDetails: '' },
        friday: { distance: '', typeOfSession: '', sessionDetails: '' },
        saturday: { distance: '', typeOfSession: '', sessionDetails: '' },
        sunday: { distance: '', typeOfSession: '', sessionDetails: '' },
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const day = e.target.name.split('-')[0];
        const field = e.target.name.split('-')[1];
        const value = e.target.value;

        setTrainingPlan(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value,
            }
        }));
    }

    const { getToken } = useContext(AuthContext);
    const token = getToken();

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Training Plan:', trainingPlan);
        console.log('Token:', token);
    
        planMethods.addPlan(trainingPlan, token)
            .then((response) => {
                console.log('Training plan saved successfully:', response);
                navigate("/");
            })
            .catch(err => {
                console.error('Error:', err);
                console.error('Error Response:', err.response.data);
            });
    };
    

    return (
        <>
            <div className='w-1/3 mx-auto accordian-container'>
                <form onSubmit={handleSubmit}>
                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(1)}>Monday</AccordionHeader>
                        <AccordionBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Distance" name="monday-distance" value={trainingPlan.monday.distance} onChange={handleChange} />
                                <Input size="lg" label="Type of Session" name="monday-typeOfSession" value={trainingPlan.monday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="monday-sessionDetails" value={trainingPlan.monday.sessionDetails} onChange={handleChange} />
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
                                <Input size="lg" label="Type of Session" name="tuesday-typeOfSession" value={trainingPlan.tuesday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="tuesday-sessionDetails" value={trainingPlan.tuesday.sessionDetails} onChange={handleChange} />
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
                                <Input size="lg" label="Type of Session" name="wednesday-typeOfSession" value={trainingPlan.wednesday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="wednesday-sessionDetails" value={trainingPlan.wednesday.sessionDetails} onChange={handleChange} />
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
                                <Input size="lg" label="Type of Session" name="thursday-typeOfSession" value={trainingPlan.thursday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="thursday-sessionDetails" value={trainingPlan.thursday.sessionDetails} onChange={handleChange} />
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
                                <Input size="lg" label="Type of Session" name="friday-typeOfSession" value={trainingPlan.friday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="friday-sessionDetails" value={trainingPlan.friday.sessionDetails} onChange={handleChange} />
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
                                <Input size="lg" label="Type of Session" name="saturday-typeOfSession" value={trainingPlan.saturday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="saturday-sessionDetails" value={trainingPlan.saturday.sessionDetails} onChange={handleChange} />
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
                                <Input size="lg" label="Type of Session" name="sunday-typeOfSession" value={trainingPlan.sunday.typeOfSession} onChange={handleChange} />
                                <Input size="lg" label="Session Details" name="sunday-sessionDetails" value={trainingPlan.sunday.sessionDetails} onChange={handleChange} />
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Button className="mt-6" fullWidth type="submit">
                        save
                    </Button>
                </form>
            </div>
        </>
    );
}

export default OriginalTrainingPlanForm;