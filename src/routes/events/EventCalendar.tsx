import React, {useState} from 'react';
import {IEvent} from "../../entities/IEvent";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {EventCard} from "./EventCard";

interface EventCalenderProps {
    events: IEvent[];
    onDeleteEvent: (eventId: number) => Promise<void>;
}

const EventCalendar: React.FC<EventCalenderProps> = ({events}) => {

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
            <div className="flex-container">
                <div className="left-column">
                    <Calendar
                        tileClassName={({date, view}) => view === 'month' && isEventDay(date) ? 'event-day' : ''}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                </div>
                <div className="events-container">
                    {eventsForSelectedDate.length > 0 ? (
                        eventsForSelectedDate.map(event => (
                            <div className="event-card" key={event.id}>
                                <EventCard event={event}/>
                            </div>
                        ))
                    ) : (
                        <p className="esn-dark-blue-half-bg">&nbsp;No events on the selected day. Choose another date on the calendar to view events.&nbsp;</p>)}
                </div>
            </div>
        </>
    );
}

export default EventCalendar;
