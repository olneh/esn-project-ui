import Footer from "../components/Footer";
import Header from "../components/Header";
import {Outlet} from "react-router-dom";

const Root = () => {

    return (
        <>
            <Header/>

            <div className="container">
                <main role="main" className="pb-3">
                    <Outlet/>
                </main>
            </div>

            <Footer/>
        </>
    );
}

export default Root;