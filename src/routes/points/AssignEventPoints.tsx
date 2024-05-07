import React from "react";
import {Button} from 'react-bootstrap';
import {MemberEventService} from "../../services/MemberEventService";

interface AssignEventPointsProps {
    eventId: number;
    memberReceiverId: number;
    memberName: string;
}


const AssignEventPoints: React.FC<AssignEventPointsProps> = ({eventId, memberReceiverId, memberName}) => {
    const memberEventService = new MemberEventService();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await memberEventService.addMemberEventPoints();
    };

    return (
        <Button className="esn-dark-blue" size="sm"
                onClick={(e) => onSubmit(e as any)}>
            ⭐ Give points to {memberName}
        </Button>
    );
};

export default AssignEventPoints;
