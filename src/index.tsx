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
import Home from "./routes/Home";
import Events from "./routes/Events";
import MemberPoints from "./routes/members/MemberPoints";
import Profile from "./routes/Profile";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/identity/Login";
import Register from "./routes/identity/Register";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Root/>,
        children: [
            {
                path: "/home",
                element: <Home/>,
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