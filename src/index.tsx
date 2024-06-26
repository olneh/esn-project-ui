import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './site.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from './routes/Root';
import Home from "./routes/home/Home";
import Events from "./routes/events/Events";
import MemberPoints from "./routes/member-points/MemberPoints";
import Profile from "./routes/profile/Profile";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/identity/Login";
import Register from "./routes/identity/Register";
import Birthday from "./routes/birthday/Birthday";
import Feedbacks from "./routes/feedback/Feedbacks";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Root/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: "/birthdays",
                element: <Birthday/>,
            },
            {
                path: "/events",
                element: <Events/>,
            },
            {
                path: "points",
                element: <MemberPoints/>,
            },
            {
                path: "profile",
                element: <Profile/>,
            },
            {
                path: "login/",
                element: <Login />,
            },
            {
                path: "register/",
                element: <Register />,
            },
            {
                path: "feedback/",
                element: <Feedbacks />,
            },
        ]
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);