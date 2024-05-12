import React, { useState } from 'react';
import { EventService } from "../../services/EventService";
import { IEvent } from "../../entities/IEvent";
import { Button, Form } from 'react-bootstrap';
import { format } from "date-fns";

interface UpdateEventComponentProps {
    event: IEvent;
}

const UpdateEventComponent = ({event}: UpdateEventComponentProps) => {
    const [eventData, setEventData] = useState<IEvent>(event);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const eventService = new EventService();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEventData(prevEvent => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (eventData.id !== 0) {
                await eventService.updateEvent(eventData.id ?? 0, eventData);
                setIsUpdated(true);
                alert("Event updated successfully.");
                window.location.reload();
            } else {
                console.error('No event selected.');
            }
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd\'T\'HH:mm');
    }

    return (
        <div>
            <h3>Edit Event</h3>
            <Form onSubmit={handleUpdateEvent}>
                <Form.Group controlId="eventTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="eventTitle" value={eventData.eventTitle}
                                  onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="eventDate">
                    <Form.Label>Event Date and Time</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="eventDate"
                        value={formatDate(eventData.eventDate)}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="comment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control as="textarea" name="comment" value={eventData.comment} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="helpersNeeded">
                    <Form.Label>Helpers Needed:</Form.Label>
                    <Form.Control type="number" name="helpersNeeded" value={eventData.helpersNeeded}
                                  onChange={handleInputChange}/>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button type="submit">Update Event</Button>
                </div>
                {isUpdated && <p>Event updated successfully.</p>}
            </Form>
        </div>
    );
};

export default UpdateEventComponent;
