import React, { useState } from 'react';
import { Modal, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { format} from "date-fns";

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
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
    });

    const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd');
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? "" : "Invalid email format";
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?\d{7,20}$/; // Optional '+' sign at the beginning and then 7 to 20 digits.
        return phoneRegex.test(phone) ? "" : "Invalid phone number format. Use + and numbers only (Max 20 digits)";
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFormChange(e);
        const { name, value } = e.target;
        let error = "";
        switch (name) {
            case "email":
                error = validateEmail(value);
                break;
            case "phone":
                error = validatePhone(value);
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const canSubmit = () => {
        return Object.values(errors).every(x => x === "");
    };

    const checkAndSubmit = () => {
        if (canSubmit()) {
            handleFormSubmit();
        } else {
            alert("Please correct the errors before submitting.");
        }
    };

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
                            onChange={onInputChange}
                            isInvalid={!!errors.email}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.email}
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Phone</FormLabel>
                        <FormControl
                            type="text"
                            name="phone"
                            value={member.phone}
                            onChange={onInputChange}
                            isInvalid={!!errors.phone}
                        />
                        <FormControl.Feedback type="invalid">
                            {errors.phone}
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Birthday</FormLabel>
                        <FormControl
                            type="date"
                            name="birthday"
                            value={formatDate(member.birthday)}
                            onChange={onInputChange}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={checkAndSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileForm;
