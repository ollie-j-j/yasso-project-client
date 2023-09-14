import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import planMethods from "../../services/plans.service";
import './OriginalTrainingPlanForm.css';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Input,
    Button,
    Radio,
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



    const { getToken } = useContext(AuthContext);
    const token = getToken();



    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Training Plan:', trainingPlan);
        console.log('Token:', token);

        planMethods.addPlan(trainingPlan, token)
            .then((response) => {
                console.log('Training plan saved successfully:', response);
                navigate("/onboarding/plan-added");
            })
            .catch(err => {
                console.error('Error:', err);
                console.error('Error Response:', err.response.data);
            });
    };


    return (
        <>
            <div className='w-1/3 mx-auto accordian-container'>
                <h1>add your plan</h1>
                <p>add your existing training plan to the form below</p>
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
                            </div>
                        </AccordionBody>
                    </Accordion>
                    <Button className="mt-6 save-button lowercase text-sm" fullWidth type="submit">
                        save
                    </Button>
                </form>
            </div>
        </>
    );
}

export default OriginalTrainingPlanForm;