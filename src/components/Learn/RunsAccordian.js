import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
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

function RunsAccordian() {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(1)}>easy</AccordionHeader>
                <AccordionBody>
                    a relaxed-paced run prioritizing comfort and endurance.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    yasso
                </AccordionHeader>
                <AccordionBody>
                    800-meter repeats used to predict marathon time based on a specific formula.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                    rest days
                </AccordionHeader>
                <AccordionBody>
                    days dedicated to no running for muscle recovery and energy restoration.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                    tempo
                </AccordionHeader>
                <AccordionBody>
                    a run at a sustained "comfortably hard" pace to improve metabolic fitness.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                    threshold
                </AccordionHeader>
                <AccordionBody>
                    a run at the boundary of aerobic and anaerobic exercise, often called lactate threshold.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(6)}>
                    long run
                </AccordionHeader>
                <AccordionBody>
                    an extended run focused on building endurance and time on feet.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(7)}>
                    recovery
                </AccordionHeader>
                <AccordionBody>
                    a slow-paced run after harder workouts to promote muscle healing.
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(8)}>
                    steady
                </AccordionHeader>
                <AccordionBody>
                    a run at a consistent, moderate pace, faster than easy but slower than tempo.
                </AccordionBody>
            </Accordion>
        </>
    );
}

export default RunsAccordian;