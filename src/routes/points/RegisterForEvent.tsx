import React from "react";
import {Container, Button} from 'react-bootstrap';
import {MemberEventService} from "../../services/MemberEventService";

interface PointsProps {
    eventId: number;
    memberReceiverId: number;
}


const RegisterForEvent: React.FC<PointsProps> = ({eventId, memberReceiverId}) => {
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
        <Button className="esn-dark-blue" size="sm"
                onClick={(e) => onClick(e as any)}
        >
            Register as user 1
        </Button>
    );
};

export default RegisterForEvent;
