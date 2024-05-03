import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { IEvent } from "../../entities/IEvent";
import {EAttendanceType} from "../../enums/EAttendanceType";

interface IProps {
    show: boolean;
    onHide: () => void;
    values: IEvent;
    handleChange: (target: EventTarget & (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const EventsRegistrationFormView = ({ show, onHide, values, handleChange, onSubmit }: IProps) => {
        return (
            <Modal show={show} onHide={onHide} centered>
                <Form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                        <Modal.Title>Register New Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="eventTitle">
                            <Form.Label>Event Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="eventTitle"
                                value={values.eventTitle}
                                onChange={(e) => handleChange(e.target as EventTarget & HTMLInputElement)}
                                placeholder="Enter event title"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="eventDate">
                            <Form.Label>Event Date and Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="eventDate"
                                onChange={(e) => handleChange(e.target as EventTarget & HTMLInputElement)}
                                placeholder="dd-MM-yyyy HH:mm"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="attendanceType">
                            <Form.Label>Attendance Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="attendanceType"
                                value={values.attendanceType}
                                onChange={(e) => handleChange(e.target as unknown as EventTarget & HTMLSelectElement)}
                            >
                                {Object.values(EAttendanceType).map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="comment">
                            <Form.Label>Additional Comments</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="comment"
                                value={values.comment}
                                onChange={(e) => handleChange(e.target as EventTarget & HTMLTextAreaElement)}
                                placeholder="Additional comments"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="helpersNeeded">
                            <Form.Label>Number of Helpers Needed</Form.Label>
                            <Form.Control
                                type="number"
                                name="helpersNeeded"
                                value={values.helpersNeeded.toString()}
                                onChange={(e) => handleChange(e.target as EventTarget & HTMLInputElement)}
                                min="0"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                        <Button variant="primary" type="submit" >Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
}

export default EventsRegistrationFormView;
