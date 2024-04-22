import React from "react";
import { Container, Button } from 'react-bootstrap';
import { MemberEventService } from "../../services/MemberEventService";

const Points = () => {
    const memberEventService = new MemberEventService();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await memberEventService.addMemberEvent();
    };

    const onClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await memberEventService.registerMemberEvent();
    };

    return (
        <Container>
            <Button
                onClick={(e) => onSubmit(e as any)}
            >
                Submit Sample Event
            </Button>
            <Button
                onClick={(e) => onClick(e as any)}
            >
                Register Sample User for Sample Event
            </Button>
        </Container>
    );
};

export default Points;
