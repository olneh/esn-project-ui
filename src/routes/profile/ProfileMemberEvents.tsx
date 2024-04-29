import React, {useEffect, useState} from "react";
import {MemberEvent} from "../../entities/IMemberEvent";
import {Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {MemberService} from "../../services/MemberService";
import MemberEventItem from "./MemberEventItem";


const ProfileMemberEvents = ({memberId}: { memberId: number }) => {
    const [events, setEvents] = useState<MemberEvent[]>([]);
    const memberService = new MemberService();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const currentMember = await memberService.getMemberById(memberId.toString());
                if (currentMember && currentMember.memberEvents) {
                    setEvents(currentMember.memberEvents);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
                setEvents([]);
            }
        };
        fetchEvents();
    }, [memberId]);

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
                                    events.map((memberEvent) =>
                                        <>
                                            <MemberEventItem memberEvent={memberEvent}/>
                                            <br/>
                                        </>
                                    )
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
