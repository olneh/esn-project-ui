import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IEvent } from "../../entities/IEvent";

interface EventCardProps {
    event: IEvent;
    onDeleteEvent: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDeleteEvent }) => {
    return (
        <>
            <Card className="mb-3 shadow-sm" style={{ width: '20rem' }}>
                <Card.Header>
                    <Card.Title>{event.eventTitle}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Comment:</strong> {event.comment}
                    </Card.Text>
                    <Card.Text>
                        <strong>Time:</strong> {new Date(event.eventDate).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Helpers needed:</strong> {event.helpersNeeded}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <Button variant="danger" size="sm" onClick={() => event.id && onDeleteEvent(event.id)}>
                        Delete
                    </Button>
                    <Button variant="secondary" size="sm">
                        Edit event
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
};