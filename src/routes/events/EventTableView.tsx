import React, {useEffect, useState} from 'react';
import {IEvent} from "../../entities/IEvent";
import { Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import {EMonths} from "../../enums/EMonths";
import {MemberEventService} from "../../services/MemberEventService";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface EventTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    events: IEvent[];
    onDeleteEvent: (eventId: string) => Promise<void>;
}

const EventTableView: React.FC<EventTableViewProps> = ({
                                                           searchKeyword,
                                                           setSearchKeyword,
                                                           events,
                                                           onDeleteEvent,
                                                       }) => {
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [memberNames, setMemberNames] = useState<{ [eventId: string]: string[] }>({});

    const memberEventService = new MemberEventService(); // Assuming you have this service ready

    useEffect(() => {
        events.forEach(event => {
            if (event.id) {
                const eventId = parseInt(event.id);
                memberEventService.getMemberNamesForEvent(eventId).then(names => {
                    setMemberNames(prev => ({...prev, [eventId]: names}));
                }).catch(error => {
                    console.error(`Failed to fetch member names for event ${eventId}:`, error);
                    setMemberNames(prev => ({...prev, [eventId]: []}));
                });
            }
        });
    }, [events]);

    const toggleSort = () => {
        setSortAscending(!sortAscending);
    };

    const sortedEvents = [...events].sort((a, b) => {
        const pointsA = a.helpersNeeded ?? 0;
        const pointsB = b.helpersNeeded ?? 0;

        if (sortAscending) {
            return pointsA - pointsB;
        } else {
            return pointsB - pointsA;
        }
    });

    const filteredEvents = sortedEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.eventDate.toDateString().toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.attendanceType.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.comment.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.helpersNeeded.toString().includes(searchKeyword.toLowerCase())
    );

    return (
        <>

            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th scope="col" style={{cursor: 'pointer'}} onClick={toggleSort}>Helpers
                        needed {sortAscending ? '↑' : '↓'}</th>
                    <th>Helpers</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEvents.map(event => (
                    <tr key={event.id}>
                        <td><OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="info-tooltip"> {event.attendanceType} </Tooltip>}>
                            <i className="bi bi-info-circle"></i>
                        </OverlayTrigger>  {event.eventTitle} </td>
                        <td>{event.eventDate ? `${new Date(event.eventDate).getDate()} ${EMonths[new Date(event.eventDate).getMonth()]}` : 'N/A'}</td>

                        <td>{event.comment}</td>
                        <td>
                            {memberNames[event.id] ? `${memberNames[event.id].length}/${event.helpersNeeded + memberNames[event.id].length}` : `0/${event.helpersNeeded}`}
                        </td>
                        <td>
                            {memberNames[event.id] ?
                                memberNames[event.id].map((name) => `${name}`) :
                                'No participants found'}
                        </td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => event.id && onDeleteEvent(event.id)}>
                                Delete
                            </Button>
                            <Button variant="info" size="sm">
                                Edit
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default EventTableView;
