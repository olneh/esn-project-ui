import React, { useState } from 'react';
import {Button, Image, Card, Col, Container, ListGroup, Row} from 'react-bootstrap';
import profilePic from '../../images/profile_pic.png';
import PointsUtility from '../../components/PointsUtility';
import EncouragementUtility from '../../components/EncouragementUtility';
import EditProfileForm from './EditProfileForm';

const ProfileMember = () => {
    const [showEditModal, setShowEditModal] = useState(false);

    const member = {
        first_name: 'Marc',
        last_name: 'Dolcet Sadurni',
        birthday: '1990-05-15',
        phone: '+1234567890',
        email: 'marc.dolcet@example.com',
        points: 0, // Change this value to test different scenarios
    };

    const handleEditButtonClick = () => {
        setShowEditModal(true);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
    };

        const handleFormSubmit = () => {
            setShowEditModal(false);
        };

        const getRandomEncouragement = () => {
            const {expressionsOfEncouragement} = EncouragementUtility;
            const randomIndex = Math.floor(Math.random() * expressionsOfEncouragement.length);
            return expressionsOfEncouragement[randomIndex];
        };

        const profileMessage = () => {
            if (member.points > 0) {
                return (
                    <div>
                        <p className="font-weight-bold mb-0">You have:</p>
                        <h4 className="mb-3">
                            {member.points} {member.points === 1 ? 'point' : 'points'}
                        </h4>
                        <p className="font-weight-bold mb-0">Current point level:</p>
                        {PointsUtility.getLevel(member.points || 0)}
                    </div>
                );
            } else {
                return (
                    <>
                        <p>
                            {member.first_name}! You don't have any points yet 🙁
                            <br/>
                            {getRandomEncouragement()}
                        </p>
                        <p>{PointsUtility.getLevel(member.points || 0)}</p>
                    </>
                );
            }
        };

        return (
            <>
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
                                        {member.first_name} {member.last_name}
                                    </Card.Title>
                                    <Button variant="primary" onClick={handleEditButtonClick}>
                                        Edit Profile
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
                                            <span className="font-weight-bold">Email:</span> {member.email}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span className="font-weight-bold">Phone:</span> {member.phone}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span className="font-weight-bold">Birthday:</span> {member.birthday}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Card className="mt-3">
                                <Card.Body>
                                    <Card.Title className="font-weight-bold">My Points: {member.points}</Card.Title>
                                    <div className="bg-body-secondary p-4 rounded">
                                        {profileMessage()}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <EditProfileForm
                    show={showEditModal}
                    handleClose={handleModalClose}
                    handleFormChange={handleFormChange}
                    handleFormSubmit={handleFormSubmit}
                    member={member}
                />
            </>
        );
    };

export default ProfileMember;
