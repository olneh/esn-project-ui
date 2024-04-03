import {Button} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from "react";
import {IEvent} from "../../entities/IEvent";
import {EventService} from "../../services/EventService";
import EventTableView from "./EventTableView";
import EventsRegistrationFormView from "./EventsRegistrationFormView";
import {useNavigate} from "react-router-dom";

const Events = () => {
    const navigate = useNavigate();
    // const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const eventService = new EventService();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [events, setEvents] = useState<IEvent[]>([]);
    const [values, setInput] = useState<IEvent>({
        eventTitle: 'Community Clean-Up',
        eventDate: new Date('2023-04-15'),
        attendanceType: 'Open',
        comment: 'Bring gloves and wear comfortable shoes.',
        helpersNeeded: 5,
    });
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventData = await eventService.getAllEvents();
            setEvents(eventData);
        };
        fetchEvents();
    }, []);

    const handleChange = (target: EventTarget & (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)) => {
        if (target.name === 'eventDate') {
            const newDate = new Date(target.value);
            setInput({...values, [target.name]: newDate});
        } else if (target.name === 'helpersNeeded') {
            setInput({...values, [target.name]: parseInt(target.value)});
        } else {
            setInput({...values, [target.name]: target.value});
        }
    };

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (values.eventTitle.length === 0) {
            setValidationErrors(["Event title is required."]);
            return;
        }
        setValidationErrors([]);
        try {
            await eventService.register(values);
            // navigate('/');
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-auto">
                    <h2>Events</h2>
                </div>
                <div className="col-auto">
                    <Button variant="primary">Suggest Event</Button>
                </div>
                <div className="col-auto">
                    <Button variant="primary">Add Event</Button>
                </div>
            </div>
            <EventTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} events={events}/>
            <EventsRegistrationFormView handleChange={handleChange} onSubmit={onSubmit} values={values}/>
        </div>
    );
};

export default Events;
