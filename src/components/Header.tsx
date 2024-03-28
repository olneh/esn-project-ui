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
                        <img src={esnLogo} alt="esnLogo" height="30"/>
                    </a>
                    <span className="navbar-brand fs-sm-3 fs-md-4 fs-lg-5"> Members </span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <ul className="navbar-nav flex-grow-1"></ul>

                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item align-self-center">
                                <Link to="home" className="nav-link text-dark">Home</Link>
                            </li>
                            <li className="nav-item align-self-center">
                                <Link to="points" className="nav-link text-dark">Points</Link>
                            </li>
                            <li className="nav-item align-self-center">
                                <Link to="events" className="nav-link text-dark">Events Helpers</Link>
                            </li>
                            <li className="nav-item align-self-center">
                                <Link to="profile" className="nav-link text-dark">My profile</Link>
                            </li>
                        </ul>

                            <div className="container-fluid">
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle"
                                               data-bs-toggle="dropdown"
                                               aria-expanded="false">
                                                <img src={esnStar} alt="esnLogo" height="30"/>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu"
                                                aria-labelledby="navbarDropdownMenuLink">
                                                <li><Link to="profile" className="dropdown-item">My Profile</Link></li>
                                                <li><Link to="privacy" className="dropdown-item">Privacy info</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to="register" className="nav-link text-dark">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="login" className="nav-link text-dark">Login</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
