import React, {useEffect, useState} from "react";
import {IMemberEvent} from "../../entities/IMemberEvent";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import MemberEventItem from "./MemberEventItem";
import {IMember} from "../../entities/IMember";

interface IProfileMemberEventsProps {
    member: IMember | null;
}

const ProfileMemberEvents: React.FC<IProfileMemberEventsProps> = ({member}) => {
    const [events, setEvents] = useState<IMemberEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if (member && member.memberEvents) {
                    setEvents(member.memberEvents);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
                setEvents([]);
            }
        };
        fetchEvents();
    }, [member]);

    return (
        <Container className="mt-5">
            <Row className="align-items-start">
                <Col md={4}></Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="font-weight-bold">Member Events</Card.Title>
                            <ListGroup>
                                {events.length > 0 ? (
                                    events.map((memberEvent, index) => (
                                        <React.Fragment key={memberEvent.id || index}>
                                            <MemberEventItem memberEvent={memberEvent}/>
                                            <br/>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <ListGroup.Item>
                                        No events found for this member.
                                    </ListGroup.Item>
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
