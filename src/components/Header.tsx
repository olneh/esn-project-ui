import esnLogo from "../images/img.png"

const Header = () => {

    return (
        <header>
            <nav
                className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src={esnLogo} alt="esnLogo" height="30"/>
                    </a>
                    <span className="navbar-brand fs-sm-3 fs-md-4 fs-lg-5"> ESN Members </span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <ul className="navbar-nav flex-grow-1"></ul>

                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item align-self-center">
                                <a className="navbar-brand" href="/"> Points </a>
                            </li>
                            <li className="nav-item align-self-center">
                                <a className="navbar-brand" href="/"> Events </a>
                            </li>
                            <li className="nav-item align-self-center">
                                <a className="navbar-brand" href="/"> My profile </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Home/Privacy"> Privacy </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Identity/Account/Register"> Register </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Identity/Account/Login"> Login </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;