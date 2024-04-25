import React from "react";
import {Container, Button} from 'react-bootstrap';
import {MemberEventService} from "../../services/MemberEventService";

interface PointsProps {
    eventId: number;
    memberReceiverId: number;
}


const Points: React.FC<PointsProps> = ({eventId, memberReceiverId}) => {
    const memberEventService = new MemberEventService();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await memberEventService.addMemberEventPoints();
    };

    const onClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await memberEventService.registerMemberEvent(eventId, memberReceiverId);
        window.location.reload();
    };

    return (
        <Container>
            {/*<Button*/}
            {/*    onClick={(e) => onSubmit(e as any)}*/}
            {/*>*/}
            {/*    Submit Sample Event*/}
            {/*</Button>*/}
            <Button
                onClick={(e) => onClick(e as any)}
            >
                Register as user 1
            </Button>
        </Container>
    );
};

export default Points;
