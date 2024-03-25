import React from "react";
import {Card, Col, Row } from "react-bootstrap";

const Points = () => {
    return (
        <>
            <h1>Points</h1>

            <h1>User Ratings</h1>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Points</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Marc</td>
                    <td>President</td>
                    <td>20. June 1908</td>
                    <td>44 555 666</td>
                    <td>president@taltech.ee</td>
                    <td>404</td>
                </tr>
                </tbody>
            </table>


            <br/>


            <table className="table table-striped">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Marc</td>
                    <td>President</td>
                    <td>20. June 1908</td>
                    <td>44 555 666</td>
                    <td>president@taltech.ee</td>
                    <td>404</td>
                </tr>
                </tbody>
            </table>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Birthday</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Points</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Marc</td>
                                    <td>President</td>
                                    <td>20. June 1908</td>
                                    <td>44 555 666</td>
                                    <td>president@taltech.ee</td>
                                    <td>404</td>
                                </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </>
    );


}

export default Points;
