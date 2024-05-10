import React from 'react';
import {Card, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { IEvent } from "../../entities/IEvent";

interface EventCardProps {
    event: IEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <>
            <Card className="mb-3 shadow-sm" style={{ width: '20rem' }}>
                <Card.Header>
                    <Card.Title className="card-top-space">{event.eventTitle}
                        &nbsp;
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="info-tooltip"> {event.attendanceType} </Tooltip>}>
                            <i className="bi bi-info-circle"></i>
                        </OverlayTrigger>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Time:</strong> {new Date(event.eventDate).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Comment:</strong> {event.comment}
                    </Card.Text>
                    <Card.Text>
                        <strong>Helpers needed:</strong> {event.helpersNeeded}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};