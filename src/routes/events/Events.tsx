import { Button, Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { IEvent } from "../../entities/IEvent";
import { EventService } from "../../services/EventService";
import EventTableView from "./EventTableView";
import EventsRegistrationFormView from "./EventsRegistrationFormView";
import EventCalendar from "./EventCalendar";
import SearchBar from "../../components/SearchBar";

const Events = () => {
    const eventService = new EventService();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [events, setEvents] = useState<IEvent[]>([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const [values, setInput] = useState<IEvent>({
        eventTitle: 'Members meeting',
        eventDate: new Date(),
        attendanceType: 'Meeting',
        comment: 'The main topic to discuss - International dinner.',
        helpersNeeded: 5,
        feedbackList: [],
        memberEvents: []
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
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const onDeleteEvent = async (eventId: number) => {
        await eventService.deleteEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
    };

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <Container>
            <Row className="align-items-center my-3">
                <Col>
                    <h1>📅 Events</h1>
                </Col>
                <EventCalendar events={events} onDeleteEvent={onDeleteEvent}/>
                <Col xs="auto" className="ms-auto">
                    <Button variant="primary" onClick={handleShowModal} className="me-2">Suggest Event</Button>
                    <Button variant="primary" onClick={handleShowModal}>Add Event</Button>
                </Col>
            </Row>
            <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
            <EventTableView searchKeyword={searchKeyword} events={events}  onDeleteEvent={onDeleteEvent}/>
            <EventsRegistrationFormView show={showModal} onHide={handleHideModal} values={values} handleChange={handleChange} onSubmit={onSubmit} />
        </Container>
    );
};

export default Events;
