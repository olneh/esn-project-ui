import React, { useState } from 'react';
import { EventService } from "../../services/EventService";
import { IEvent } from "../../entities/IEvent";
import {Button, Form} from 'react-bootstrap';

interface UpdateEventComponentProps {
    event: IEvent;
}

const UpdateEventComponent = ({ event }: UpdateEventComponentProps) => {
    const [eventData, setEventData] = useState<IEvent>(event);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const eventService = new EventService();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData(prevEvent => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (eventData.id !== 0) {
                await eventService.updateEvent(eventData.id, eventData);
                setIsUpdated(true);
            } else {
                console.error('No event selected.');
            }
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };



    return (
        <div>
            <h2>Update Event</h2>
            <Form onSubmit={handleUpdateEvent}>
                <Form.Group controlId="eventTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="eventTitle" value={eventData.eventTitle} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="eventDate">
                    <Form.Label>Event Date and Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="eventDate"
                        // value=
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="comment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control as="textarea" name="comment" value={eventData.comment} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="helpersNeeded">
                    <Form.Label>Helpers Needed:</Form.Label>
                    <Form.Control type="number" name="helpersNeeded" value={eventData.helpersNeeded} onChange={handleInputChange} />
                </Form.Group>
                <Button type="submit">
                    Update Event
                </Button>
                {isUpdated && <p>Event updated successfully.</p>}
            </Form>
        </div>
    );
};

export default UpdateEventComponent;
