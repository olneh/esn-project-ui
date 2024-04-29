import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import {MemberEvent} from "../../entities/IMemberEvent";

interface MemberEventItemProps {
    memberEvent: MemberEvent;
}

const MemberEventItem: React.FC<MemberEventItemProps> = ({ memberEvent }) => {
    return (
        <ListGroup.Item className="bg-body-secondary p-4 rounded">
            <Row className="mb-2">
                <Col>
                    <strong>📅 Event:</strong> {memberEvent.event?.eventTitle || 'N/A'}
                    <div>
                        <small className="text-muted">
                            {memberEvent.event?.eventDate ? format(new Date(memberEvent.event.eventDate), 'dd MMMM yyyy HH:mm') : 'N/A'}
                        </small>
                    </div>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <strong>💬 Comment:</strong> {memberEvent.event?.comment || 'No comments added'}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    {memberEvent.task ? <a><strong>📋 Task:</strong> {memberEvent.task}</a> : ''}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <strong>⭐ Points:</strong> {memberEvent.points > 0 ? `${memberEvent.points} Points` : ' No points assigned yet'}
                </Col>
            </Row>
            {memberEvent.points > 0 && memberEvent.memberManager && (
                <Row className="mb-2">
                    <Col>
                        <strong>Assigned by:</strong> {memberEvent.memberManager.firstName}
                    </Col>
                </Row>
            )}
        </ListGroup.Item>
    );
};

export default MemberEventItem;
