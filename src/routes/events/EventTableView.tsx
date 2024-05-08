import React, {useEffect, useState} from 'react';
import {IEvent} from "../../entities/IEvent";
import {Alert, Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import {MemberEventService} from "../../services/MemberEventService";
import 'bootstrap-icons/font/bootstrap-icons.css';
import RegisterForEvent from "../points/RegisterForEvent";
import UpdateEvent from "./UpdateEvent";
import {format, isFuture} from "date-fns";
import {MemberService} from "../../services/MemberService";
import {IMember} from "../../entities/IMember";
import AssignEventPoints from "../points/AssignEventPoints";

interface EventTableViewProps {
    searchKeyword: string;
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
    const [membersByEvent, setMembersByEvent] = useState<{ [eventId: number]: IMember[] }>({});

    const memberEventService = new MemberEventService();
    const memberService = new MemberService();

    const [visibleEventId, setVisibleEventId] = useState<number | null>(null);
    const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);

    useEffect(() => {
        const fetchMembersForEvents = async () => {
            const membersData: { [eventId: number]: IMember[] } = {};
            for (const event of events) {
                if (event.id) {
                    const memberIds = await memberEventService.getMemberIdsForEvent(event.id);
                    membersData[event.id] = await memberService.getMembersByIds(memberIds);
                }
            }
            setMembersByEvent(membersData);
        };
        fetchMembersForEvents();
    }, [events]);

    const toggleSort = () => {
        setSortAscending(!sortAscending);
    };

    const toggleShowUpcomingOnly = () => {
        setShowUpcomingOnly(!showUpcomingOnly);
    };

    const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.eventDate);
        const dateB = new Date(b.eventDate);

        // If both events are in the future, sort by date
        if (isFuture(dateA) && isFuture(dateB)) {
            return sortAscending ? (dateA.getTime() - dateB.getTime()) : (dateB.getTime() - dateA.getTime());
        }
        // If both events are in the past, sort by date, recent on top
        else if (!isFuture(dateA) && !isFuture(dateB)) {
            return sortAscending ? (dateB.getTime() - dateA.getTime()) : (dateA.getTime() - dateB.getTime());
        }
        // If one event is in the future and the other is in the past, prioritize the future event
        else {
            return isFuture(dateA) ? -1 : 1;
        }
    });

    const displayedEvents = sortedEvents.filter(event => {
        const isUpcoming = isFuture(new Date(event.eventDate));
        const matchesKeyword = (
            event.eventTitle.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            event.eventDate.toString().includes(searchKeyword.toLowerCase()) ||
            event.comment.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        return (showUpcomingOnly ? isUpcoming : true) && matchesKeyword;
    });

    const toggleVisibility = (eventId: number): void => {
        setVisibleEventId(visibleEventId === eventId ? null : eventId);
    };

    return (
        <>
            <Button onClick={toggleShowUpcomingOnly} className="mb-2">
                {showUpcomingOnly ? 'Show All Events' : 'Show Only Upcoming Events'}
            </Button>
            <Table striped={false} bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>When?</th>
                    <th>Event</th>
                    <th scope="col" style={{cursor: 'pointer'}} onClick={toggleSort}>Helpers
                        {sortAscending ? ' ↑' : ' ↓'}</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {displayedEvents.map(event => (
                    <tr key={event.id}
                        className={new Date(event.eventDate) < new Date() ? 'esn-dark-blue-half-bg-table' : ''}>
                        <td key={event.id}> {event.eventDate ? format(new Date(event.eventDate), 'dd MMMM yyyy HH:mm') : 'N/A'}</td>
                        <td>
                            {event.eventTitle} <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="info-tooltip">{event.attendanceType}</Tooltip>}>
                            <i className="bi bi-info-circle"></i>
                        </OverlayTrigger>
                            <br/>{event.comment}
                        </td>
                        <td>
                            {membersByEvent[event.id ?? 0] && (
                                <>
                                    {new Date(event.eventDate) > new Date() && (
                                        <p className="esn-orange-half">
                                            {event.helpersNeeded - (membersByEvent[event.id ?? 0]?.length ?? 0) > 0
                                                ? `Needed: ${event.helpersNeeded - (membersByEvent[event.id ?? 0]?.length ?? 0)}`
                                                : ''
                                            }
                                        </p>
                                    )}
                                    <br/>
                                    {membersByEvent[event.id ?? 0].length > 0 ?
                                        membersByEvent[event.id ?? 0].map((member) => (
                                            <div key={member.id}>
                                                {new Date(event.eventDate) > new Date() && (
                                                    <span>{member.firstName} {member.lastName}</span>
                                                )}
                                                {new Date(event.eventDate) < new Date() && (
                                                    <AssignEventPoints eventId={event.id ?? 0}
                                                                       memberReceiverId={member.id}
                                                                       memberName={member.firstName + ' ' + member.lastName}/>
                                                )}
                                            </div>)) :
                                        new Date(event.eventDate) > new Date() && (event.helpersNeeded - (membersByEvent[event.id ?? 0]?.length ?? 0)) > 0
                                            ? <Alert className={"esn-orange-half"}>Be the first one to join! 🚀</Alert>
                                            : (new Date(event.eventDate) > new Date() &&
                                                <Alert className={"esn-dark-blue-half"}>No places available</Alert>)
                                    }
                                </>
                            )}
                        </td>

                        <td>
                            {(new Date(event.eventDate) > new Date()) && (
                                (event.helpersNeeded - (membersByEvent[event.id ?? 0]?.length ?? 0)) > 0 ? (
                                    <>
                                        <RegisterForEvent eventId={event.id ?? 1} memberReceiverId={1}/>
                                    </>) : ("")
                            )}
                            <br/>
                            <Button className="esn-cyan" size="sm" onClick={() => toggleVisibility(event.id ?? 0)}>
                                {visibleEventId === event.id ? 'Close Edit' : 'Edit event'}
                            </Button>
                            <br/>
                            <Button className="esn-magenta" size="sm"
                                    onClick={() => event.id && onDeleteEvent(event.id)}>
                                Delete Event
                            </Button>
                            {visibleEventId === event.id && <UpdateEvent event={event}/>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default EventTableView;
