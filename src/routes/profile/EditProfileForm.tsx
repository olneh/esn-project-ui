import React from 'react';
import { Modal, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import {format} from "date-fns";

interface EditProfileFormProps {
    show: boolean;
    handleClose: () => void;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: () => void;
    member: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        birthday: Date;
    };
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
                                                             show,
                                                             handleClose,
                                                             handleFormChange,
                                                             handleFormSubmit,
                                                             member,
                                                         }) => {
    const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd');
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            name="email"
                            value={member.email}
                            onChange={handleFormChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Phone</FormLabel>
                        <FormControl
                            type="text"
                            name="phone"
                            value={member.phone}
                            onChange={handleFormChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Birthday</FormLabel>
                        <FormControl
                            type="date"
                            name="birthday"
                            value={formatDate(member.birthday)}
                            onChange={handleFormChange}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileForm;
