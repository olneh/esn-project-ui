// EventCard.tsx
import React from 'react';
import { Card, Col, ListGroup, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { IEvent } from '../../entities/IEvent';  // Import the interface that describes the event structure
import { EMonths } from '../../enums/EMonths';

interface EventCardProps {
    event: IEvent;
    index: number;
    isEventPassed: (eventDate: Date) => boolean;
    onAddFeedback: (event: IEvent) => void;
}

const EventFeedbackCard: React.FC<EventCardProps> = ({ event, index, isEventPassed, onAddFeedback }) => {
    return (
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <Card className="mb-3 shadow-sm" style={{ width: '20rem', minHeight: '12rem' }}>
                <Card.Header>
                    <Card.Title>
                        {new Date(event.eventDate).getDate()} {EMonths[new Date(event.eventDate).getMonth()]}
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id={`tooltip-${index}`}>
                                {new Date(event.eventDate).toDateString()} - {event.attendanceType}
                            </Tooltip>}
                        >
                            <i className="bi bi-info-circle ms-2"></i>
                        </OverlayTrigger>
                        <br />
                        {event.eventTitle}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {event.feedbackList.length > 0 ? (
                            event.feedbackList.map((feedback, feedbackIndex) => (
                                <ListGroup.Item key={feedbackIndex}>{feedback.comment}</ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No feedback available.</ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    {isEventPassed(new Date(event.eventDate)) ? (
                        <Button onClick={() => onAddFeedback(event)}>Add Feedback</Button>
                    ) : (
                        <Alert className="esn-dark-blue-half-bg">This event is upcoming</Alert>
                    )}
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default EventFeedbackCard;