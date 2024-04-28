import React, { useEffect, useState } from 'react';
import {Card, ListGroup, Container, Row, Col, Button, OverlayTrigger, Tooltip, Alert} from 'react-bootstrap';
import { EventService } from '../../services/EventService';
import { IEvent } from '../../entities/IEvent';
import { EMonths } from '../../enums/EMonths';

const FeedbackManager: React.FC = () => {
    const eventService = new EventService();
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsFromService = await eventService.getAllEvents();
                if (Array.isArray(eventsFromService)) {
                    const sortedEvents = eventsFromService.sort((a, b) => {
                        const dateA = a.eventDate ? new Date(a.eventDate) : new Date(0);
                        const dateB = b.eventDate ? new Date(b.eventDate) : new Date(0);
                        const monthA = dateA.getMonth();
                        const dayA = dateA.getDate();
                        const monthB = dateB.getMonth();
                        const dayB = dateB.getDate();
                        return monthA === monthB ? dayA - dayB : monthA - monthB;
                    });

                    setEvents(sortedEvents);
                } else {
                    console.error('Event data is not an array');
                    setEvents([]);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]);
            }
        };
        fetchEvents();
    }, []);

    const isEventPassed = (eventDate: Date) => {
        const today = new Date();
        return new Date(eventDate) < today;
    };

    return (
        <Container fluid>
            <h2>📝Feedbacks</h2>
            <Row className="my-4 justify-content-center">
                {events.map((event, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                        <Card className="mb-3 shadow-sm" style={{ width: '20rem', minHeight: '12rem' }}>
                            <Card.Header>
                                <Card.Title>
                                    <br/>
                                    {new Date(event.eventDate).getDate()}&nbsp;
                                    {EMonths[new Date(event.eventDate).getMonth()]}&nbsp;
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="info-tooltip">
                                                {new Date(event.eventDate).getDate()}&nbsp;
                                                {EMonths[new Date(event.eventDate).getMonth()]}&nbsp;
                                                {new Date(event.eventDate).getFullYear()}
                                                {` - ${event.attendanceType}`}
                                            </Tooltip>
                                        }
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
                                            <ListGroup.Item key={feedbackIndex}>
                                                {feedback.comment}
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>No feedback available.</ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                {isEventPassed(event.eventDate) ? (
                                    <Button>Add Feedback</Button>
                                ) : (
                                    <Alert className={"esn-dark-blue-half-bg"}>This event is upcoming</Alert>
                                )}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeedbackManager;
