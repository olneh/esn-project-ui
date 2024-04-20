import React from 'react';
import {Button, Image, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import profilePic from "../../images/profile_pic.png";

const ProfileMember = () => {
    const member = {
        first_name: "Marc",
        last_name: "Dolcet Sadurni",
        birthday: "1990-05-15",
        phone: "+1234567890",
        email: "marc.dolcet@example.com",
        points: 0 //  Change this value to test different scenarios
    };
    const {first_name, last_name, birthday, phone, email, points} = member;

    // Assign level based on points
    const getLevel = (points: number) => {
        if (points >= 20) return "👑 Erasmus King";
        else if (points >= 15) return "🐰 Tutuic's Bestie";
        else if (points >= 12) return "🎓 TalTech IC Guru";
        else if (points >= 9) return "🎉 Party Maestro";
        else if (points >= 7) return "🎈 Event Enthusiast";
        else if (points >= 3) return "🦋 Social Butterfly";
        else if (points >= 1) return "🤝 Helping Rookie";
        else return "🍀 Lucky Newbie";
    };

    const expressionsOfEncouragement = [
        "Time to make your first steps to become Erasmus Overlord 🌟",
        "Psst, want to earn some points? 👀",
        " Every journey begins with a single step. 👣 You can earn some points helping!",
        "Check the events to earn your first point!🎉",
        "🍀 Lucky Newbie! Let's start earning points together!"
    ];

    const getRandomEncouragement = () => {
        const randomIndex = Math.floor(Math.random() * expressionsOfEncouragement.length);
        return expressionsOfEncouragement[randomIndex];
    };

    const profileMessage = () => {
        if (points > 0) {
            return (
                <div>
                    <p className="font-weight-bold mb-0">You have:</p>
                    <h4 className="mb-3">{points} {points === 1 ? 'point' : 'points'}!</h4>
                    <p className="font-weight-bold mb-0">Current point level:</p>
                    <h4>{getLevel(points)}</h4>
                </div>
            );
        } else {
            const encouragement = getRandomEncouragement();
            return (
                <>
                    <p>{first_name}! You don`t have any points yet 🙁
                        <br/> {encouragement}</p>
                    <p>Current point level: {getLevel(points)}</p>
                </>
            );
        }
    };

    return (
        <>
            <br/>
            <Container className="mt-5">
                <Row className="align-items-start">
                    <Col md={4}>
                        <Card>
                            <Card.Body className="text-center">
                                <Image src={profilePic} alt="Profile Picture" className="profile-img mb-3"/>
                                <Card.Title>{first_name} {last_name}</Card.Title>
                                <Button variant="primary">Edit Profile</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="font-weight-bold">My Info</Card.Title>
                                <ListGroup>
                                    <ListGroup.Item><span className="font-weight-bold">Email:</span> {email}
                                    </ListGroup.Item>
                                    <ListGroup.Item><span className="font-weight-bold">Phone:</span> {phone}
                                    </ListGroup.Item>
                                    <ListGroup.Item><span className="font-weight-bold">Birthday:</span> {birthday}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        <Card className="mt-3">
                            <Card.Body>
                                <Card.Title className="font-weight-bold">My Points: {points}</Card.Title>
                                <div className="bg-body-secondary p-4 rounded">
                                    {profileMessage()}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProfileMember;
