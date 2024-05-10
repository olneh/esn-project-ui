import React, {useEffect, useState} from "react";
import {IMemberEvent} from "../../entities/IMemberEvent";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import MemberEventItem from "./MemberEventItem";
import {IMember} from "../../entities/IMember";
import {MemberEventService} from "../../services/MemberEventService";

interface IProfileMemberEventsProps {
    member: IMember | null;
}

const ProfileMemberEvents: React.FC<IProfileMemberEventsProps> = ({member}) => {
    const [events, setEvents] = useState<IMemberEvent[]>([]);
    const memberEventService = new MemberEventService();

    useEffect(() => {
        memberEventService.getMemberEventsByMemberId(member?.id ?? 0)
            .then(events => {
                setEvents(events);
            })
            .catch(error => {
                console.error('Error loading member events:', error);
            });
    }, [member?.id]);

    return (
        <>
        <Container className="mt-5">
            <Row className="align-items-start">
                <Col md={4}></Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="font-weight-bold">My Events</Card.Title>
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
        </>
    );
};

export default ProfileMemberEvents;
