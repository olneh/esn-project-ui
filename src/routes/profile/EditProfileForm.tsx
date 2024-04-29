import React from 'react';
import { Modal, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

interface EditProfileFormProps {
    show: boolean;
    handleClose: () => void;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: () => void;
    member: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        birthday: string;
    };
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
                                                             show,
                                                             handleClose,
                                                             handleFormChange,
                                                             handleFormSubmit,
                                                             member,
                                                         }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            type="text"
                            name="first_name"
                            value={member.first_name}
                            onChange={handleFormChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            type="text"
                            name="last_name"
                            onChange={handleFormChange}
                            value={member.last_name}
                        />
                    </FormGroup>
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
                            value={member.birthday}
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
