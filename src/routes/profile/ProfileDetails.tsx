import React from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';
import { IMember } from '../../entities/IMember';
import { format } from 'date-fns';
import profilePic from '../../images/profile_pic.png';

interface ProfileDetailsProps {
    member: IMember;
    handleEditButtonClick: () => void;
    profileMessage: () => JSX.Element;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ member, handleEditButtonClick, profileMessage }) => {
    return (
        <Container className="mt-5">
            <Row className="align-items-start">
                <Col md={4}>
                    <Card>
                        <Card.Body className="text-center">
                            <Image
                                src={profilePic}
                                alt="Profile Picture"
                                className="profile-img mb-3"
                            />
                            <Card.Title>
                                {member.firstName} {member.lastName}
                            </Card.Title>
                            <Button variant="primary" onClick={handleEditButtonClick}>
                                Edit Profile Info
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="font-weight-bold">My Info</Card.Title>
                            <ListGroup>
                                <ListGroup.Item>
                                    <span className="font-weight-bold">Email:</span> {member.email ?? 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span className="font-weight-bold">Phone:</span> {member.phone ?? 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <span className="font-weight-bold">Birthday:</span> {member.birthday ? format(member.birthday, 'yyyy-MM-dd') : 'N/A'}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title className="font-weight-bold">My Points: {member.points ?? 0}</Card.Title>
                            <div className="bg-body-secondary p-4 rounded">
                                {profileMessage()}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileDetails;
