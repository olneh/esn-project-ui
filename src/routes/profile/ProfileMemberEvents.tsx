import React, { useEffect, useState } from "react";
import {MemberEventService} from "../../services/MemberEventService";
import {MemberEvent} from "../../entities/IMemberEvent";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";


const ProfileMemberEvents = ({ memberId }: { memberId: number }) => {
    const [events, setEvents] = useState<MemberEvent[]>([]);
    const memberEventService = new MemberEventService();

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await memberEventService.getEventsForMember(memberId);
            setEvents(fetchedEvents);
        };

        fetchEvents();
    }, [memberId]);

    return (
        <Container className="mt-5">
            <Row className="align-items-start">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="font-weight-bold">Member Events</Card.Title>
                            <ListGroup>
                                {events.length > 0 ? (
                                    events.map((memberEvent) => (
                                        <ListGroup.Item key={memberEvent.id}>
                                            <span className="font-weight-bold">Task:</span> {memberEvent.task} <br />
                                            <span className="font-weight-bold">Points:</span> {memberEvent.points} <br/>
                                            {memberEvent.points > 0 && memberEvent.memberManager ? (
                                                <>
                                                    <span className="font-weight-bold">Assigned by:</span> {memberEvent.memberManager.firstName} <br/>
                                                </>
                                            ) : null}
                                            {/*<span className="font-weight-bold">Event Title:</span> {memberEvent.event?.eventTitle} <br/>*/}
                                            {/*<span className="font-weight-bold">Event Date:</span> {memberEvent.event?.eventDate ? format(new Date(memberEvent.event.eventDate), 'dd MMMM yyyy HH:mm') : 'N/A'} <br/>*/}
                                            {/*<span className="font-weight-bold">Attendance Type:</span> {memberEvent.event?.attendanceType} <br/>*/}
                                            {/*<span className="font-weight-bold">Comment:</span> {memberEvent.event?.comment} <br/>*/}
                                            {/*<span className="font-weight-bold">Helpers Needed:</span> {memberEvent.event?.helpersNeeded} <br/>*/}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>No events found for this member.</ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileMemberEvents;
