import { Button } from 'react-bootstrap';
import {MemberService} from "../../services/MemberService";
import {useEffect, useState} from "react";
import {IMember} from "../../entities/IMember";
import {EventService} from "../../services/EventService";
import {IEvent} from "../../entities/IEvent";
import EventTableView from "./EventTableView";

const sampleEvents = [
    {
        eventTitle: 'Sample Event 1',
        date: new Date(),
        attendanceType: 'In-person',
        comment: 'Sample comment',
        helpersNeeded: 2,
    },
    {
        eventTitle: 'Sample Event 2',
        date: new Date(),
        attendanceType: 'Virtual',
        comment: 'Another sample comment',
        helpersNeeded: 1,
    },
];

const Events = () => {

    const eventService = new EventService();
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventData = await eventService.getAllEvents();
            setEvents(eventData);
        };
        fetchEvents();
    }, []);



    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-auto">
                        <h2>Events</h2>
                    </div>
                    <div className="col-auto">
                        <Button variant="primary">Suggest Event</Button>
                    </div>
                    <div className="col-auto">
                        <Button variant="primary">Add Event</Button>
                    </div>
                </div>
            </div>

            <EventTableView searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} events={events}/>


        </div>
    );
};

export default Events;


