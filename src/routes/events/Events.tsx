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
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
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

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (values.eventTitle.length === 0) {
            setValidationErrors(["Event title is required."]);
            return;
        }
        setValidationErrors([]);
        try {
            await eventService.register(values);
            setShowModal(false); // Close the modal after submit
            // navigate('/'); // Redirect if needed
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    // Function to show the modal
    const handleShowModal = () => setShowModal(true);

    // Function to hide the modal
    const handleHideModal = () => setShowModal(false)


    return (
        <div className="container">
            <div className="row">
                <div className="col-auto">
                    <h2>Events</h2>
                </div>
                {/*TODO add vs suggest logic*/}
                <div className="col-auto">
                    <Button variant="primary" onClick={handleShowModal}>Suggest Event</Button>
                </div>
                <div className="col-auto">
                    <Button variant="primary" onClick={handleShowModal}>Add Event</Button>
                </div>
            </div>
            <EventTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} events={events}/>
            <EventsRegistrationFormView show={showModal} onHide={handleHideModal} values={values} handleChange={handleChange} onSubmit={onSubmit}/>
        </div>
    );
};

export default Events;
