import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { EventService } from '../../services/EventService';
import { FeedbackService } from '../../services/FeedbackService';
import { IEvent } from '../../entities/IEvent';
import { IFeedback } from '../../entities/IFeedback';
import FeedbackModal from "./FeedbackForm";
import EventFeedbackCard from "./EventFeedbackCard";

const FeedbackManager: React.FC = () => {
    const eventService = new EventService();
    const feedbackService = new FeedbackService();
    const [events, setEvents] = useState<IEvent[]>([]);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
    const [feedbackText, setFeedbackText] = useState('');

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

    const isEventPassed = (eventDate: Date) => new Date(eventDate) < new Date();

    const handleAddFeedbackClick = (event: IEvent) => {
        setSelectedEvent(event);
        setShowFeedbackForm(true);
    };

    const handleCloseFeedbackForm = () => {
        setShowFeedbackForm(false);
        setFeedbackText('');
        setSelectedEvent(null);
    };

    const handleFeedbackSubmit = async () => {
        if (selectedEvent && feedbackText) {
            const newFeedback: IFeedback = {
                eventId: selectedEvent.id,
                comment: feedbackText
            };

            try {
                await feedbackService.createFeedback(newFeedback, newFeedback.eventId);
                window.location.reload();
            } catch (error) {
                console.error('Failed to submit feedback:', error);
                alert('Failed to submit feedback. Please try again.');
            }
            handleCloseFeedbackForm();
        }
    };

    return (
        <Container fluid>
            <Row className="my-4 justify-content-center">
                {events.map((event, index) => (
                    <EventFeedbackCard
                        key={index}
                        event={event}
                        index={index}
                        isEventPassed={isEventPassed}
                        onAddFeedback={handleAddFeedbackClick}
                    />
                ))}
            </Row>
            <div>
                <FeedbackModal
                    show={showFeedbackForm}
                    onHide={handleCloseFeedbackForm}
                    feedbackText={feedbackText}
                    setFeedbackText={setFeedbackText}
                    onSubmit={handleFeedbackSubmit}
                />
            </div>
        </Container>
    );
};

export default FeedbackManager;
