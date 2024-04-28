import esnStar from "../images/ESN star.png"
import esnLogo from "../images/ESN logo full.png"
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>
            <nav
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <a className="navbar-brand" href="/home">
                        <img src={esnLogo} alt="ESN Logo" height="30"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarToggler" aria-controls="navbarToggler"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="home" className="nav-link text-dark">🏠 Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="profile" className="nav-link text-dark">👤 My Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="points" className="nav-link text-dark">⭐ Rating Points</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="events" className="nav-link text-dark">📅 Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="birthdays" className="nav-link text-dark">🎂 Birthday Calendar</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="feedback" className="nav-link text-dark">📝 Feedbacks</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={esnStar} alt="ESN Star" height="30"/>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to="profile" className="dropdown-item">My Profile</Link></li>
                                    <li><Link to="privacy" className="dropdown-item">Privacy Info</Link></li>
                                    <li className="nav-item">
                                        <Link to="register" className="nav-link text-dark">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="login" className="nav-link text-dark">Login</Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
}

export default Header;
