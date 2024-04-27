import React, {useEffect, useState} from 'react';
import {IEvent} from "../../entities/IEvent";
import {Alert, Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import {MemberEventService} from "../../services/MemberEventService";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Points from "../points/Points";
import UpdateEvent from "./UpdateEvent";
import {format} from "date-fns";

interface EventTableViewProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
    events: IEvent[];
    onDeleteEvent: (eventId: number) => Promise<void>;
}

const EventTableView: React.FC<EventTableViewProps> = ({
                                                           searchKeyword,
                                                           // setSearchKeyword,
                                                           events,
                                                           onDeleteEvent,
                                                       }) => {
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [memberNames, setMemberNames] = useState<{ [eventId: string]: string[] }>({});

    const memberEventService = new MemberEventService();

    const [visibleEventId, setVisibleEventId] = useState<number | null>(null);

    useEffect(() => {
        events.forEach(event => {
            if (event.id) {
                const eventId = event.id;
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

    const [dateSortAscending, setDateSortAscending] = useState<boolean>(true);
    const toggleDateSort = () => {
        setDateSortAscending(!dateSortAscending);
    };
    const dateSortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.eventDate).getTime();
        const dateB = new Date(b.eventDate).getTime();
        return dateSortAscending ? dateA - dateB : dateB - dateA; // Sort by date
    });
    const filteredDateSortedEvents = dateSortedEvents.filter((event) => {
        const eventTitleMatches = event.eventTitle.toLowerCase().includes(searchKeyword.toLowerCase());
        const eventDateMatches = event.eventDate && format(new Date(event.eventDate), 'dd MMM yyyy HH:mm').toLowerCase().includes(searchKeyword.toLowerCase());
        return eventTitleMatches || eventDateMatches;
    });

    const sortedEvents = [...events].sort((a, b) => {
        const participantsNeededTotalA = a.helpersNeeded ?? 0;
        const participantsNeededTotalB = b.helpersNeeded ?? 0;
        const participantsRegisteredA = memberNames[a.id]?.length ?? 0;
        const participantsRegisteredB = memberNames[b.id]?.length ?? 0;

        const participantsNeededCurrentlyA = participantsNeededTotalA - participantsRegisteredA;
        const participantsNeededCurrentlyB = participantsNeededTotalB - participantsRegisteredB;

        if (sortAscending) {
            return participantsNeededCurrentlyA - participantsNeededCurrentlyB;
        } else {
            return participantsNeededCurrentlyB - participantsNeededCurrentlyA;
        }
    });

    const filteredEvents = sortedEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.eventDate.toDateString().toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.attendanceType.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.comment.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        event.helpersNeeded.toString().includes(searchKeyword.toLowerCase())
    );

    const toggleVisibility = (eventId: number): void => {
        setVisibleEventId(visibleEventId === eventId ? null : eventId);
    };

    return (
        <>
            <Table striped={false} bordered hover className="mt-4">
                <thead>
                <tr>
                    <th></th>
                    <th>Event</th>
                    <th scope="col" style={{cursor: 'pointer'}} onClick={toggleSort}>Helpers
                        needed {sortAscending ? '↑' : '↓'}</th>
                    <th>Helpers</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredEvents.map(event => (

                    <tr key={event.id}>
                        <td> {event.eventDate ? format(new Date(event.eventDate), 'dd MMMM yyyy HH:mm') : 'N/A'}</td>
                        <td><OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="info-tooltip"> {event.attendanceType} </Tooltip>}>
                            <i className="bi bi-info-circle"></i>
                        </OverlayTrigger> {event.eventTitle}
                            <br/><br/> {event.comment}
                        </td>

                        <td>
                            {memberNames[event.id] && (
                                <>
                                    <p className={"esn-orange-half"}>Needed: {event.helpersNeeded - memberNames[event.id]?.length ?? 0} </p>
                                    Registered: {memberNames[event.id].length}/{event.helpersNeeded} <br/>
                                </>
                            )}
                        </td>
                        <td>
                            {memberNames[event.id] && memberNames[event.id].length > 0 ?
                                memberNames[event.id].map((name) => <div key={name}>{name}<br/></div>) :
                                <Alert variant="secondary">Be the first one to join! 🚀</Alert>}
                        </td>
                        <td>
                            {(event.helpersNeeded - (memberNames[event.id]?.length ?? 0)) > 0
                                ? <Points eventId={event.id} memberReceiverId={1}/>
                                : <><Alert variant="secondary">No more places</Alert></>}
                        </td>
                        <td>
                            <Button className="esn-cyan" size="sm" onClick={() => toggleVisibility(event.id)}>
                                {visibleEventId === event.id ? 'Close Edit' : 'Open Edit'}
                            </Button>
                            {visibleEventId === event.id && <UpdateEvent event={event}/>}
                            <div className="d-flex justify-content-center">
                                <Button className="esn-magenta" size="sm" onClick={() => event.id && onDeleteEvent(event.id)}>
                                    Delete Event
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default EventTableView;
