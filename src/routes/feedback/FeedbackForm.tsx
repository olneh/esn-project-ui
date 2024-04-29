import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface FeedbackModalProps {
    show: boolean;
    onHide: () => void;
    feedbackText: string;
    setFeedbackText: (text: string) => void;
    onSubmit: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ show, onHide, feedbackText, setFeedbackText, onSubmit }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="feedback">
                        <Form.Label>Feedback</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={onSubmit}>Save Feedback</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FeedbackModal;