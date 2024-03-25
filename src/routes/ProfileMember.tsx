import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Row} from "react-bootstrap";
import profilePic from "../images/profile_pic.png";

const ProfileMember = () => {
    return (
        <>
            <>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <h2>Your Profile</h2>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xs={12} sm={3}>
                                <img src={profilePic} alt="Profile Picture" className="img-fluid"/>
                            </Col>
                            <Col xs={12} sm={9}>
                                <h4>First Name: Marc</h4>
                                <h4>Last Name: President</h4>
                                <h4>Birthday: 20. June 1908</h4>
                                <h4>Phone number: 44 555 666</h4>
                                <h4>Email: president@taltech.ee</h4>
                                <h4>Points: 404 </h4>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br/>
            </>
            <br/>
            <br/>
        </>
    );
}
export default ProfileMember;
