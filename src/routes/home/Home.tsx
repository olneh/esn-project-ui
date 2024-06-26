import esnLogo from "../../images/ESN_star.png";
import esnGroup from "../../images/ESN_group_photo.png";
import pic1 from "../../images/img_1.png";
import pic2 from "../../images/img_2.png";
import pic from "../../images/img.png";
import {Card, Carousel} from "react-bootstrap";
import React from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="text-center">
                <h1>
                    <div><img src={esnLogo} alt="esnLogo" height="30"/>Home</div>
                </h1>
            </div>
            <Carousel>
                <Carousel.Item>
                    <div className="carousel-item-container">
                        <img src={pic1} alt="ESN Logo" className="carousel-img"/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel-item-container">
                        <img src={pic2} alt="ESN Logo" className="carousel-img"/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel-item-container">
                        <img src={pic} alt="ESN Logo" className="carousel-img"/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel-item-container">
                        <img src={esnGroup} alt="ESN Logo" className="carousel-img"/>
                    </div>
                </Carousel.Item>
            </Carousel>


            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <div className="title-description">
                        <h2>Welcome to the ESN TalTech IC App!</h2>
                    </div>
                    <div className="flex-container">
                        <div className="column" onClick={() => navigate('/profile')}>
                            <span className="feature-content">
                                <p className="feature-title">👤 My Profile</p>
                                <p>Check out your personal space! Customize your profile info to always stay updated!</p>
                            </span>
                        </div>

                        <div className="column" onClick={() => navigate('/points')}>
                            <span className="feature-content">
                                <p className="feature-title">⭐ Rating Points</p>
                                <p>Earn your points! Join events or share thoughts to earn points. Show your influence and level up your status!</p>
                            </span>
                        </div>
                        <div>
                            <div className="column" onClick={() => navigate('/events')}>
                                <span className="feature-content">
                                <p className="feature-title">📅 Events</p>
                                <p>Let's have fun together! Check out our calendar of meetings and gatherings. Meet new friends and make memories!</p>
                                </span>
                            </div>
                            <div className="column" onClick={() => navigate('/feedback')}>
                                <span className="feature-content">
                                <p className="feature-title">📝 Feedbacks</p>
                                <p> Share your thoughts on recent events to help us make them better!</p>

                                </span>
                            </div>
                        </div>
                        <div className="column" onClick={() => navigate('/birthdays')}>
                            <span className="feature-content">
                                <p className="feature-title">🎂 Birthday Calendar</p>
                                <p>Celebrate with us! Keep track of birthdays and send warm wishes. Let's make every day special!</p>
                            </span>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default Home;
