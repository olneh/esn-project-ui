import React, {useState} from 'react';
import {IEvent} from "../../entities/IEvent";
import {Button, Card} from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {EventCard} from "./EventCard";
import {EMonths} from "../../enums/EMonths";

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

    const isEventDay = (date: Date): boolean => {
        return events.some(event => {
            const eventDate = new Date(event.eventDate); // Parse event date into a Date object
            return date.getDate() === eventDate.getDate() &&
                date.getMonth() === eventDate.getMonth() &&
                date.getFullYear() === eventDate.getFullYear();
        });
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (value: any) => {
        if (Array.isArray(value)) {
            setSelectedDate(value[0]);
        } else {
            setSelectedDate(value);
        }
    };

    const eventsForSelectedDate = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return selectedDate &&
            eventDate.getDate() === selectedDate.getDate() &&
            eventDate.getMonth() === selectedDate.getMonth() &&
            eventDate.getFullYear() === selectedDate.getFullYear();
    });


    return (
        <>
            <div style={{display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'start'}}>
                <div style={{flex: 1}}>
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map(event => (
                            <EventCard event={event} onDeleteEvent={onDeleteEvent}/>
                        ))
                    ) : (
                        <p>No events for this day.</p>
                    )}
                    <Calendar
                        tileClassName={({date, view}) => view === 'month' && isEventDay(date) ? 'event-day' : ''}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                </div>
            </div>


            <table className="table table-striped table-bordered mt-4">
                <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Attendance type</th>
                    <th scope="col">Comment</th>
                    <th scope="col" style={{cursor: 'pointer'}} onClick={toggleSort}>Helpers
                        needed {sortAscending ? '↑' : '↓'}</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEvents.map(event => (
                    <tr key={event.id}>
                        <td>{event.eventTitle}</td>
                        <td>{event.eventDate ? `${new Date(event.eventDate).getDate()} ${EMonths[new Date(event.eventDate).getMonth()]}` : 'N/A'}</td>
                        <td>{event.attendanceType}</td>
                        <td>{event.comment}</td>
                        <td>{event.helpersNeeded}</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => event.id && onDeleteEvent(event.id)}>
                                Delete
                            </Button>
                            <Button
                                variant="info"
                                size="sm"
                                // onClick={() => event.id && onUpdateEvent(event.id, event)}
                            >
                                Edit
                            </Button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            {
                filteredEvents.map(event => (
                    <EventCard event={event} onDeleteEvent={onDeleteEvent}/>
                ))}
        </>
    );
}

export default EventTableView;
